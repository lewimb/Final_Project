package model

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Qty int `json:"qty"`
}