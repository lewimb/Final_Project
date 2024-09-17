package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string      `json:"username"`
	Password string      `json:"password"`
	Profile  UserProfile `json:"profile" gorm:"foreignKey:UserID"`
}

type UserProfile struct {
	gorm.Model
	UserID     uint   `json:"user_id"`
	Fullname   string `json:"fullname"`
	ProfilePic string `json:"profilepic"`
}
