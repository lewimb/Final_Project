package model

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	ImgUrl string `json:"imgurl"`
	Desc   string `json:"desc"`
	Name   string `json:"name"`
	Price  uint   `json:"price"`
}
