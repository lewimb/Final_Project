package repository

import (
	"github/lewimb/fp_backend/model"

	"gorm.io/gorm"
)

type ItemRepo struct {
	db *gorm.DB
}

func (repo *ItemRepo) GetByItemID(id int) (*model.Item, error) {
	var item model.Item

	err := repo.db.Where("id = ?", id).First(&item).Error

	if err != nil {
		return nil, err
	}

	return &item, nil

}

func (repo *ItemRepo) GetItemList() ([]model.Item, error) {
	var items []model.Item

	err := repo.db.Find(&items).Error

	if err != nil {
		return nil, err
	}

	return items, nil

}
