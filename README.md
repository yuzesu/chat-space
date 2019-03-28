# What
chat-spaceにおける必要なデータベースを作成する

# Why
サービス行う際に必要なデータベースを作る必要があるから

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :members
- has_many groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## membersテーブル(memo:middle_table)
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Assciation
- belongs_to :user
- belongs_to :group

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer| foreign_key: true|
|user_id|integer| foreign_key: true|

### Asscociation
- belongs_to :user
- belongs_to :group

