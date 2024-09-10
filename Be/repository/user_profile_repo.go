package repository

import (
	"github/lewimb/fp_backend/model"

	"gorm.io/gorm"
)

type UserProfileRepo struct {
	db *gorm.DB
}

func (repo *UserProfileRepo) Create(up *model.UserProfile) error {

	if err := repo.db.Create(&up).Error; err != nil {
		return err
	}
	return nil
}

func NewUserProfileRepository(db *gorm.DB) *UserProfileRepo {
	return &UserProfileRepo{db: db}
}
