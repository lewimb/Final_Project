package controller

import (
	"github/lewimb/fp_backend/repository"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ItemController interface {
	GetItems(*gin.Context)
	GetItemByID(*gin.Context)
}

type itemController struct {
	repo *repository.ItemRepo
}

func (ic *itemController) GetItems(c *gin.Context) {

	items, err := ic.repo.Get()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Succesfully retrieved items",
		"data": gin.H{
			"items": items,
		}})

}

func (ic *itemController) GetItemByID(c *gin.Context) {
	paramId := c.Param("id")
	id, err := strconv.Atoi(paramId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
	}

	item, err := ic.repo.GetById(id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Succesfully retrieved item by id",
		"data": gin.H{
			"item": item,
		}})
}

func NewItemController(ir *repository.ItemRepo) *itemController {
	return &itemController{repo: ir}
}
