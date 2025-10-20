package controllers

import (
	"backend/database"
	"backend/models"
	"net/http"
	"time"
	"github.com/golang-jwt/jwt/v5"
	"github.com/alexedwards/argon2id"
	"github.com/gin-gonic/gin"
)

type LoginData struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterData struct {
	Username string `json:"username"`
	Email string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	ConfirmPassword string `json:"confirmPassword" binding:"required"`
}

func GetUser (c *gin.Context) {
	var user []models.User

	database.DB.Find(&user)
	c.JSON(http.StatusOK, user) 
}

func Login (c *gin.Context) {
	var input LoginData

	// validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// check if email and password are not empty
	if input.Email == "" || input.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email and Password are required"})
		return
	}

	var user models.User

	// check if user exists
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	match, err := argon2id.ComparePasswordAndHash(input.Password, user.Password)

	// check if password is correct
	if err != nil || !match {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	accessToken, err := user.GenerateJWT(1 * time.Minute)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to generate access token"})
		return
	}

	refreshToken, err := user.GenerateJWT(7 * 24 * time.Hour)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate refresh token"})
		return
	}

	c.SetCookie(
		"refresh_token",
		refreshToken,
		int((7 * 24 * time.Hour).Seconds()),
		"/",
		"localhost",
		false,
		true,
	)

	user.Password = ""
	c.JSON(http.StatusOK, gin.H{"token": accessToken, "user": user})
}

func Register (c * gin.Context) {
	var input RegisterData

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Email == "" || input.Password == "" || input.ConfirmPassword == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email, Password, and Confirm Password are required"})
		return
	}

	if input.Password != input.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Password and Confirm password is not match"})
	}

	var existingUser models.User

	if err := database.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	hash, _ := argon2id.CreateHash(input.Password, argon2id.DefaultParams)

	user := models.User{
		Username: input.Username,
		Email: input.Email,
		Password: hash,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}
	
	user.Password = ""
	c.JSON(http.StatusCreated, gin.H{"message": "User created successfuly", "user": user})
}	

func RefreshToken(c * gin.Context) {

	refreshToken, err := c.Cookie("refresh_token")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Refresh token not found"})
		return
	}

	token, err := jwt.Parse(refreshToken, func(t *jwt.Token) (interface{}, error) {
		return models.JwtSecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid claims"})
		return
	}

	user := models.User{
		ID: uint(claims["user_id"].(float64)),
		Username: claims["username"].(string),
		Email: claims["email"].(string),
	}

	newAccesToken, err := user.GenerateJWT(5 * time.Minute)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": newAccesToken,
	})

}

func Logout (c *gin.Context) {
	c.SetCookie("refresh_token", "", -1, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successfully"})
}