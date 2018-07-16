-- ---
-- Globals
-- ---
CREATE DATABASE moodvies;
CREATE TABLE Movies (
		movieId int NOT NULL AUTO_INCREMENT,
		movieName varchar (100),
		moviePosterURL varchar (255),
		whimsical int(4),
		intense int(4),
		thriller int(4),
		heartfelt int(4),
		gripping int(4),
		boring int(4),
		thoughtProvoking int(4),
		uplifting int(4),
		light int(4),
		tearJerker int(4),
		challenging int(4),
		mindScrew int(4),
		nostalgic int(4),
		powerful int(4),
		despair int(4),
		exhausting int(4),
		paranoid int(4),
		motivated int(4),
		uncomfortable int(4),
)

CREATE TABLE Users (
		userId int NOT NULL AUTO_INCREMENT,
		username varchar (100),
		password varchar (100)
)
-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---


-- ---
-- Test Data
-- ---