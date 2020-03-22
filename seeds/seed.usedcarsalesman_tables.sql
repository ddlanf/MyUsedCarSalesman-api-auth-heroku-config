BEGIN;

TRUNCATE
  myusedcarsalesman_users,
  myusedcarsalesman_posts,
  myusedcarsalesman_images,
  myusedcarsalesman_reports,
  myusedcarsalesman_admins
  RESTART IDENTITY CASCADE;

INSERT INTO myusedcarsalesman_users (user_name, password, first_name, last_name, email)
VALUES 
('user1', '$2a$12$5zm0GHzAh5un2Wl1xq6AzeoIvHi8meeRLRyly5Tp7lRziaC7YeBXi', 'user1_first_name', 'user1_last_name', 'user1@gmail.com'),
('user2', '$2a$12$6B2SVEHzfoe98o9OpROrJuh7AVMFMVSXC4lwJJLyTw6KBRLyMvDwC', 'user2_first_name', 'user2_last_name', 'user2@gmail.com'),
('user3', '$2a$12$2ZojknwS5h0wbwJdVFszUOQq8c3gnP9OF8/2NqUIY..KD.bviiJJ6', 'user3_first_name', 'user3_last_name', 'user3@gmail.com'),
('user4', '$2a$12$NABJjMk8UODsijN64Xhgvuep/ct89KgOAc0aV2sD2HxklIz/77hRG', 'user4_first_name', 'user4_last_name', 'user4@gmail.com'),
('user5', '$2a$12$7FtF6.dGce67GXCb.cP9..R40frbliJPUn3DZRF4ezJR8FrzSqzHq', 'user5_first_name', 'user5_last_name', 'user5@gmail.com');

INSERT INTO myusedcarsalesman_posts (make, model, year, mileage, description, commission_amount, location, price, other_terms_and_conditions, user_id)
VALUES
('Toyota', 'Camry', 1994, 87000, 'This Toyota Camry was well maintained. Has clean title and mechanically in perfect condition.', '20%', 'San Diego, CA', 11000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount not negotiable', 2),
('Ford', 'F150', 2000, 62000, 'This Ford F150 was well maintained. Has clean title and mechanically in perfect condition.', '15% and any amount above the price listed', 'San Diego, CA', 11000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount negotiable', 2),
('Porche', 'Cayman', 2004, 75000, 'This Porche Cayman was well maintained. Has clean title and mechanically in perfect condition.', '5%', 'San Diego, CA', 11000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount not negotiable', 5),
('Ford', 'F150', 2006, 56000, 'This Ford F150 was well maintained. Has clean title and mechanically in perfect condition.', '15% and any amount above the price listed', 'San Diego, CA', 19000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount negotiable', 1),
('Porche', 'Cayman', 2003, 49000, 'This Porche Cayman was well maintained. Has clean title and mechanically in perfect condition.', '5%', 'San Diego, CA', 25000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount not negotiable', 4),
('Ford', 'F150', 2011, 91000, 'This Ford F150 was well maintained. Has clean title and mechanically in perfect condition.', '15% and any amount above the price listed', 'San Diego, CA', 10000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount negotiable', 3),
('Porche', 'Cayman', 2010, 96000, 'This Porche Cayman was well maintained. Has clean title and mechanically in perfect condition.', '5%', 'San Diego, CA', 13000, 'Sellers will be responsible for paying any damages incurred during selling process. Commission amount not negotiable', 3);

INSERT INTO myusedcarsalesman_images (src, alt, post_id)
VALUES  
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRfA5sxTwcizTW-d1s0TFrxqf_M2Jj4hRzk19oiHJyFRBXyLXfd', 'Toyota Camry 1994', 1),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQREPeEmTZL379E01ABrML6cb1zxH72THvae0tTMMK6IzzK41xu', 'Toyota Camry 1994 2', 1),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9BQxbzMhITW8lp08GcknWaU01161Vf19G7D83c6TkTobWZJut', 'Ford F150 2000', 2),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYG8L6oXEeAwazXStJQ57oDrb5ahKV54aIgWedOGBL99vPGsbs', 'Porche Cayman 2004', 3),
('https://cdn-w.v12soft.com/photos/dcK0cTc/12301534/76102_000004156_yqmwopt_800600.jpg', 'Ford F150 2006', 4),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5NncIvZRlusN9zUP_yMQguxAzweRL5gkOinnEqZM_FB-wE1n3', 'Porche Cayman 2003', 5),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRObXzIYF2z_SeGX93PCulGePmlig1wlwlrTuibGXOM5s9hTBm', 'Ford F150 2011', 6),
('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ-LaxgjzmhZXeIhtBMThB1cWofHpLcCFtyt0cllJ7spazsN1BC', 'Porche Cayman 2010', 7);

INSERT INTO myusedcarsalesman_reports (message, message_type, user_id)
VALUES 
('This app has really bad user experince', 'Complaint', 1),
('There is a bug on the log in page', 'Bug', 2),
('User 5 has inappropriate images in its posting', 'Report', 4);

INSERT INTO myusedcarsalesman_admins (admin_name, password)
VALUES 
('admin', '$2a$12$n3VeTta3P8TJmhNGY13nKeVDDvW4NbVe8cIl.e8tNPxjPQFzOQZxu'),
('John', '$2a$12$ni.t9TY7oKQOjC23Pdrxq.GufAdZx7ZeX32fw4AajjC6f5xbW0MqW');

COMMIT;