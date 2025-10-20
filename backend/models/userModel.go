package models

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"unique;not null"`
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
}

var JwtSecret = []byte(os.Getenv("SECRET_TOKEN"))

func (u *User) GenerateJWT(duration time.Duration) (string, error) {

	claims := jwt.MapClaims{
		"user_id": u.ID,
		"email": u.Email,
		"username": u.Username,
		"exp": time.Now().Add(duration).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(JwtSecret)
}