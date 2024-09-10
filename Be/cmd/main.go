package main

import (
	"github/lewimb/fp_backend/controller"
	"github/lewimb/fp_backend/model"
	"github/lewimb/fp_backend/repository"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	r := gin.Default()

	db, err := model.ConnectToDB()
	if err != nil {
		log.Fatal(err)
	}

	ur := repository.NewUserRepository(db)
	pr := repository.NewUserProfileRepository(db)
	uc := controller.NewUserController(ur, pr)

	registerRoutes(r, uc)

	r.Run(":8080")
}
