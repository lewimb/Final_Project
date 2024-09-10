package repository

import (
	"github/lewimb/fp_backend/model"

	"gorm.io/gorm"
)

type UserRepo struct {
	db *gorm.DB
}

func (repo *UserRepo) GetByUsername(username string) (*model.User, error) {
	var user model.User

	err := repo.db.Where("username = ?", username).First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil

}

func (repo *UserRepo) Create(newUser *model.User) error {
	if err := repo.db.Create(&newUser).Error; err != nil {
		return err
	}
	return nil
}

// func (repo *UserRepo) UsernameExist(username string) (bool, error) {
// 	var count int64

// 	err := repo.db.Model(&model.User{}).Where("username = ?", username).Count(&count).Error
// 	if err != nil {
// 		return false, err
// 	}

// 	return count > 0, nil
// }

func NewUserRepository(db *gorm.DB) *UserRepo {
	return &UserRepo{db: db}
}
