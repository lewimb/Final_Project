package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserProfile struct {
	gorm.Model
	User       User
	UserID     uint   `json:"user_id"`
	Fullname   string `json:"fullname"`
	ProfilePic string `json:"profilepic"`
}
