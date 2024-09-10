package controller

import (
	"github/lewimb/fp_backend/repository"

	"github.com/gin-gonic/gin"
)

type ItemController interface {
	GetItemList(*gin.Context)
	GetItemByID(*gin.Context)
}

type itemController struct {
	repo *repository.ItemRepo
}

func (ic *itemController) GetItemList(*gin.Context) {

}

func (ic *itemController) GetByItemID(*gin.Context) {

}

func NewItemController(ir *repository.ItemRepo) *itemController {
	return &itemController{repo: ir}
}
