package main

import (
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github/lewimb/fp_backend/controller"
	"github/lewimb/fp_backend/model"
	"github/lewimb/fp_backend/repository"
	"github/lewimb/fp_backend/utils/common"
)

func main() {
	godotenv.Load()

	r := gin.Default()

	db, err := model.ConnectToDB()
	if err != nil {
		log.Fatal(err)
	}

	tokenLifeTime, err := strconv.Atoi(os.Getenv("TOKEN_LIFE_TIME"))
	if err != nil {
		log.Fatal(err)
	}

	jwtService := common.NewJwtToken(common.TokenConfig{
	IssuerName:      os.Getenv("TOKEN_ISSUE_NAME"),
		JwtSignatureKey: []byte(os.Getenv("TOKEN_KEY")),
		JwtLifeTime:     time.Duration(tokenLifeTime) * time.Hour,
  })

	ur := repository.NewUserRepository(db)
	pr := repository.NewUserProfileRepository(db)
	uc := controller.NewUserController(ur, pr, jwtService)

	registerRoutes(r, uc)

	r.Run(":8080")
}
