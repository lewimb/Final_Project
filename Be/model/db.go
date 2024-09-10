package model

import (
	"os"

	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB() (*gorm.DB, error) {
	var (
		host     = os.Getenv("DB_HOST")
		user     = os.Getenv("DB_user")
		password = os.Getenv("DB_password")
		dbname   = os.Getenv("DB_DBNAME")
		port     = os.Getenv("DB_PORT")
	)

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta", host, user, password, dbname, port)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	if err = db.AutoMigrate(&User{}); err != nil {
		return nil, err
	}

	if err = db.AutoMigrate(&UserProfile{}); err != nil {
		return nil, err
	}

	if err = db.AutoMigrate(&Item{}); err != nil {
		return nil, err
	}

	return db, nil
}
