package controller

import (
	"github/lewimb/fp_backend/model"
	"github/lewimb/fp_backend/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ItemController interface {
	GetItemList(*gin.Context)
	GetItemByID(*gin.Context)
}

type itemController struct {
	repo *repository.ItemRepo
}

func (ic *itemController) GetItemList(c *gin.Context) {

	items, err := ic.repo.GetItemList()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"ListOfItems": items})

}

func (ic *itemController) GetByItemID(c *gin.Context) {
	var item model.Item

	itemById, err := ic.repo.GetByItemID(int(item.ID))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error})
		return
	}

	c.JSON(http.StatusOK, gin.H{"itemByID": itemById})
}

func NewItemController(ir *repository.ItemRepo) *itemController {
	return &itemController{repo: ir}
}
