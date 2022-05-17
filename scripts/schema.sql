CREATE DATABASE pet_food;

USE pet_food;

CREATE TABLE dog_food (
  product_id int NOT NULL,
  brand varchar(45) NOT NULL,
  category varchar(255) NOT NULL,
  age varchar(45) NOT NULL,
  health_needs varchar(45) DEFAULT NULL,
  price int DEFAULT NULL,
  image varchar(255) DEFAULT NULL,
  animal varchar(20) DEFAULT NULL,
  name varchar(500) DEFAULT NULL,
  PRIMARY KEY (product_id),
  UNIQUE KEY id_dog_UNIQUE (product_id)
);

--INSERT INTO dog_food (
--    product_id, 
--    brand, 
--    category, 
--    age, 
--    health_needs, 
--    price, 
--    image, 
--    animal, 
--    name
--) VALUES (1,"Royal Canin","dry","puppy","immune","125","/images/dog_food/royal_canin_puppy_maxi.jpg","dog","Maxi Puppy Dry Food"),
--(2,"Black Hawk","dry","adult","digestive","173","/images/dog_food/food2.jpg","dog","Original Adult Lamb & Rice Dry Dog Food"),
--(3,"Black Hawk","dry","puppy","digestive","40","/images/dog_food/food3.png","dog","Original Puppy Lamb & Rice Dry Dog Food"),
--(4,"Royal Canin","dry","puppy","digestive","50","/images/dog_food/food4.jpg","dog","Medium Puppy Dry Food"),
--(5,"Royal Canin","wet","adult","skin",130,"/images/dog_food/food5.jpg","dog","Labrador RetrieverAdult Dry Dog Food"),
--(6,"Royal Canin","wet","adult","digestive",120,"/images/dog_food/food6.jpg","dog","Medium Adult Dry Dog Food"),
--(7,"Royal Canin","dry","adult","immune",130,"/images/dog_food/food7.jpg","dog","Maxi Adult Dry Dog Food"),
--(8,"Black Hawk","wet","adult","digestive",59,"/images/dog_food/food8.png","dog","Grain Free Adult Salmon Dry Dog Food"),
--(9,"Royal Canin","dry","puppy","digestive",130,"/images/dog_food/food9.jpg","dog","German Shepherd Puppy Dry Food"),
--(10,"Royal Canin","dry","kitten","immune",125,"/images/cat_food/image1.png","cat","Kitten Instinctive in Gravy"),
--(11,"Pro Plan","wet","adult","skin",130,"/images,/cat_food/food2.jpg","cat","Indoor Hairball Control Dry + Wet Cat Food Bundle"),
--(12,"Black Hawk","wet","adult","immune",152,"/images/cat_food/food3.jpg","cat","Light Weight Care Dry + Wet Cat Food Bundle"),
--(13,"Black Hawk","dry","adult","skin",58,"/images/dog_food/food10.jpg","dog","Original Adult Large Breed Chicken Dry Dog Food"),
--(14,"Black Hawk","wet","puppy","immune",65,"/images/dog_food/food11.jpg","dog","Original Adult Fish & Potato Dry Dog Food");

CREATE TABLE credentials (
  customer_id int NOT NULL AUTO_INCREMENT,
  name varchar(100) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  password varchar(100) DEFAULT NULL,
  PRIMARY KEY (customer_id)
); 

CREATE TABLE purchases (
  purchase_id int DEFAULT NULL,
  customer_id int DEFAULT NULL,
  product_id int DEFAULT NULL,
  date datetime DEFAULT NULL,
  time time DEFAULT NULL,
  quantity int DEFAULT NULL,
  id int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  KEY purchases_ibfk_1 (customer_id),
  KEY purchases_ibfk_2 (product_id),
  CONSTRAINT purchases_ibfk_1 FOREIGN KEY (customer_id) REFERENCES credentials (customer_id),
  CONSTRAINT purchases_ibfk_2 FOREIGN KEY (product_id) REFERENCES dog_food (product_id)
);

GRANT ALL ON *.* TO 'root';
--GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
--FLUSH PRIVILEGES;


