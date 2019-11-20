# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string｜null: false,unique: true|
|name|string|null: false,unique: true|
|password|string|null: false|

### Association
- has_many :groups
- has_many :groups_users　th
- has_many :chats

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|varchar(255)|null: false,unique: true|
|user_id|integer|null: false,foreign_key: true|

### Association
- has_many :users　th
- has_many :groups_users
- has_many :chats
## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false,foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## chatテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|groups_users_id|integer|null: false,foreign_key: true|
|image|string||

### Association
- belongs_to :group
- belongs_to :user