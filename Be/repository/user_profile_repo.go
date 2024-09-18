package repository

import (
	"github/lewimb/fp_backend/model"

	"gorm.io/gorm"
)

type UserProfileRepo struct {
	db *gorm.DB
}

func (repo *UserProfileRepo) GetByUserId(userId uint) (*model.UserProfile, error) {
	userProfile := model.UserProfile{}
	if err := repo.db.Where("user_id = ?", userId).First(&userProfile).Error; err != nil {
		return nil, err
	}

	return &userProfile, nil
}

func (repo *UserProfileRepo) Create(up *model.UserProfile) error {
	if err := repo.db.Create(&up).Error; err != nil {
		return err
	}
	return nil
}

func (repo *UserProfileRepo) Update(userId uint, up *model.UserProfile) error {
	if err := repo.db.Model(&model.UserProfile{}).Where("user_id = ?", userId).Updates(&up).Error; err != nil {
		return err
	}
	return nil
}

func (repo *UserProfileRepo) Delete(userId uint) error {
	if err := repo.db.Where("user_id = ?", userId).Delete(&model.UserProfile{}).Error; err != nil {
		return err
	}
	return nil
}

func NewUserProfileRepository(db *gorm.DB) *UserProfileRepo {
	return &UserProfileRepo{db: db}
}
