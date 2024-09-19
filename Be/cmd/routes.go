package main

import (
	"github/lewimb/fp_backend/controller"

	"github.com/gin-gonic/gin"
)

func registerRoutes(
	r *gin.Engine,
	uc controller.UserController,
	ic controller.ItemController,
	authMiddleware gin.HandlerFunc,
) {
	r.GET("/products", ic.GetItems)
	r.GET("/products/:id", ic.GetItemByID)

	r.POST("/users/login", uc.Login)
	r.POST("/users/register", uc.Register)

	r.Use(authMiddleware)

	r.GET("/users/:username/profile", uc.GetUserProfile)
	r.PUT("/users/:username/profile", uc.UpdateUserProfile)
	r.DELETE("/users/:username", uc.DeleteUser)
}
