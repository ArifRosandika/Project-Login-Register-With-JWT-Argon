package routes

import (
	"backend/controllers"
	"backend/middleware"
	"github.com/gin-gonic/gin"
)

func UserRoute (r *gin.Engine) {
	r.POST("/login", controllers.Login)
	r.POST("/refresh", controllers.RefreshToken)
	r.POST("/register", controllers.Register)
	
	auth := r.Group("/auth")
	auth.Use(middleware.VerifyToken)
	auth.DELETE("/logout", controllers.Logout)
	auth.GET("/users", controllers.GetUser)
}