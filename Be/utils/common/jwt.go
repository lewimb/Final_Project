package common

import (
	"errors"
	"time"

	"github/lewimb/fp_backend/model"

	"github.com/golang-jwt/jwt/v5"
)

type JwtTokenClaims struct {
	jwt.RegisteredClaims
	Username string `json:"username"`
}

type TokenConfig struct {
	IssuerName      string
	JwtSignatureKey []byte
	JwtLifeTime     time.Duration
}

type JwtToken interface {
	VerifyToken(tokenString string) (jwt.MapClaims, error)
	GenerateToken(payload model.User) (string, error)
}

type jwtToken struct {
	cfg TokenConfig
}

func (j *jwtToken) VerifyToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return j.cfg.JwtSignatureKey, nil
	})

	if err != nil {
		return nil, errors.New("failed to verify token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !token.Valid || !ok || claims["iss"] != j.cfg.IssuerName {
		return nil, errors.New("invalid claim token")
	}

	return claims, nil
}

func (j *jwtToken) GenerateToken(payload model.User) (string, error) {
	claims := JwtTokenClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    j.cfg.IssuerName,
			IssuedAt:  jwt.NewNumericDate(time.Now().UTC()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(j.cfg.JwtLifeTime)),
		},
		Username: payload.Username,
	}

	jwtNewClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := jwtNewClaims.SignedString(j.cfg.JwtSignatureKey)
	if err != nil {
		return "", errors.New("failed to generate token")
	}
	return token, nil
}

func NewJwtToken(cfg TokenConfig) JwtToken {
	return &jwtToken{cfg: cfg}
}
