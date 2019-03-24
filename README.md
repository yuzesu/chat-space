# README

# What
chat-spaceにおける必要なデータベースを作成する

# Why
サービス行う際に必要なデータベースを作る必要があるから

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|integer|index: true, null: false, unique: true|
|mail|string|null: false, unique: true|

### Association
- has_many groups, through: members
- has_many :messages
- has_many :members

## membersテーブル(middle table)

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Asscociation
- has_many :mambers
- has_many :users through members
