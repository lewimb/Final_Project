package middleware

import (
	"github/lewimb/fp_backend/repository"
	"github/lewimb/fp_backend/utils/common"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(jwtService common.JwtToken, ur *repository.UserRepo) gin.HandlerFunc {
	return func(c *gin.Context) {
		accessToken := c.GetHeader("Authorization")

		if accessToken == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}

		claims, err := jwtService.VerifyToken(accessToken)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		var username string

		for key, value := range claims {
			if key == "username" {
				username = value.(string)
			}
		}

		user, err := ur.GetByUsername(username)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}
