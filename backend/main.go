package main

import (
	"backend/database"
	"backend/routes"
	"log"
	"time"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.ConnectDB()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"}, // alamat frontend
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true, // penting buat cookie / refresh token
        MaxAge:           12 * time.Hour,
    }))

	routes.UserRoute(r)

	r.Run(":8080")
}