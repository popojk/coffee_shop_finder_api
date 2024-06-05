package data

import (
	"context"
	"database/sql"
	"log"
	"time"
)

const dbTimeout = time.Second * 3

var db *sql.DB

func New(dbPoool *sql.DB) Models {
	db = dbPoool

	return Models{
		Review: Review{},
	}
}

type Models struct {
	Review Review
}

type Review struct {
	ID        int        `json:"id"`
	Rating    float32    `json:"rating" validate:"required"`
	Content   string     `json:"content,omitempty"`
	UserID    int        `json:"userId" validate:"required"`
	ShopID    string     `json:"shopId" validate:"required"`
	UpdatedAt *time.Time `json:"updated_at"`
	CreatedAt time.Time  `json:"created_at"`
}

func (r *Review) GetByID(id int) (*Review, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `select id, rating, content, user_id, shop_id, updated_at, created_at from review where id=$1`

	var review Review
	row := db.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&review.ID,
		&review.Rating,
		&review.Content,
		&review.UserID,
		&review.ShopID,
		&review.UpdatedAt,
		&review.CreatedAt,
	)

	if err != nil {
		return nil, err
	}
	return &review, nil
}

func (r *Review) GetByShopID(shopID string, page int, pageSize int) ([]*Review, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	offset := getOffset(page, pageSize)
	query := `select id, rating, content, user_id, shop_id, updated_at, created_at from review where shop_id=$1 order by id desc limit $2 offset $3`

	rows, err := db.QueryContext(ctx, query, shopID, pageSize, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []*Review

	for rows.Next() {
		var review Review
		err := rows.Scan(
			&review.ID,
			&review.Rating,
			&review.Content,
			&review.UserID,
			&review.ShopID,
			&review.UpdatedAt,
			&review.CreatedAt,
		)
		if err != nil {
			log.Println("Error scanning", err)
			return nil, err
		}
		reviews = append(reviews, &review)
	}
	return reviews, nil
}

func (r *Review) Insert() (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	var newID int
	stmt := `insert into review (rating, content, user_id, shop_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) returning id`
	localTime := time.Now().Local()

	err := db.QueryRowContext(ctx, stmt,
		r.Rating,
		r.Content,
		r.UserID,
		r.ShopID,
		localTime,
		localTime,
	).Scan(&newID)

	if err != nil {
		return 0, err
	}

	return newID, nil
}

func (r *Review) Delete() error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	query := `delete from review where id=$1`

	_, err := db.ExecContext(ctx, query, r.ID)
	if err != nil {
		return err
	}
	return nil
}

func getOffset(page int, pageSize int) (offset int) {
	calPage := page - 1
	offset = calPage * pageSize
	return
}
