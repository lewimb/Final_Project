package middleware

import (
	"github/lewimb/fp_backend/utils/common"
	"net/http"

	"github.com/gin-gonic/gin"
)

func JWTMiddleware(jwtService common.JwtToken) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}
		userId, err := jwtService.VerifyToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort() // Stop further handlers from being executed
			return
		}
		c.Set("userID", userId)
		c.Next()
	}
}
