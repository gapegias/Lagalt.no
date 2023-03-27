-- lagalt_users
INSERT INTO lagalt_user (user_name,user_about_me, user_hide)
     VALUES ('tzafilkos','Hello, I am a game developer with a portofilio in pixel-art games. Using Unity as game engine ', false);                                                    -- 1
INSERT INTO lagalt_user (user_name, user_about_me, user_hide)
     VALUES ('pegias', 'Hello, I am a young higly motivated software developer focusing on Back-End Development. I have participated in various projects with small and large teams. Also member of a rock band as a painist :)', false);  -- 2
INSERT INTO lagalt_user (user_name,user_about_me, user_hide)
     VALUES ('nomikos','Hi! I am a young director focusing mostly in short film documentaries. I have participate in local and international film festivals. I am also a part-time graphic designer', false);  -- 3
INSERT INTO lagalt_user (user_name,user_about_me, user_hide)
     VALUES ('tripodis','Hello everyone. I ll try to keep it simple:) front end developer and music composer!!' ,false); -- 4
-- projects
INSERT INTO project (project_title, project_purpose, project_owner, project_topic)
     VALUES ('Pac-Man, (dark themed)', 'A classic pac-man game (dark theme/halloween inspired) ', 'tzafilkos', 'GAME DEVELOPMENT'); -- 1
     INSERT INTO project (project_title, project_purpose, project_owner, project_topic)
     VALUES ('Rpg Game 2D', 'Simple RPG game for educational use', 'tzafilkos', 'GAME DEVELOPMENT'); -- 2
INSERT INTO project (project_title, project_purpose, project_owner, project_topic)
     VALUES ('The Avengers: Funmade', 'Filming a funmade movie of first avenger movie.','nomikos', 'FILMS');   -- 3
     INSERT INTO project (project_title, project_purpose, project_owner, project_topic)
     VALUES ('Film scoring Sci-Fi', 'Soundtrack for a sci-fi short film', 'nomikos', 'MUSIC'); -- 4
INSERT INTO project (project_title, project_owner, project_topic)
     VALUES ('Online shop for a small grocery shop', 'pegias', 'WEB DEVELOPMENT');         -- 5
INSERT INTO project (project_title,project_purpose, project_owner, project_repo_url, project_topic)
     VALUES ('Barber shop site','Site for a barber shop were clients can book their haircut appointments', 'tripodis', 'https//:github.com/tripodis/barberShop', 'WEB DEVELOPMENT');            -- 6
-- lagalt_user_projects
INSERT INTO lagalt_user_projects (project_id, user_id)
VALUES (1, 1), -- 1
       (2, 1), -- 2
       (3, 3), -- 3
       (4, 3), -- 4
       (5, 2), -- 5
       (6, 4), -- 6
       (6, 2), -- 7
       (5, 4), -- 8
       (4, 2), -- 9
       (1, 2), -- 10
       (1, 4); -- 11
-- skills
INSERT INTO skill (skill_name)
VALUES ('VIDEO EDITING'),              -- 1
       ('BEING ORGANIZED'),            -- 2
       ('HAVING CREATIVITY'),          -- 3
       ('PLAYING MUSICAL INSTRUMENT'), -- 4
       ('WEB PROGRAMMING'),            -- 5
       ('GAMING PROGRAMMING');         -- 6
       
       
-- lagalt_user_skills
INSERT INTO lagalt_user_skills (user_id, skill_id)
VALUES (1, 3), -- 1
       (1, 6), -- 2
       (2, 2), -- 3
       (2, 5), -- 4
       (2, 4), -- 5
       (3, 1), -- 6
       (3, 2), -- 7
       (3, 3), -- 8
       (4, 1), -- 9
       (4, 2), -- 10
       (4, 3), -- 11
       (4, 4), -- 12
-- project_skills
INSERT INTO project_skills (project_id, skill_id)
VALUES (1, 2), -- 1
       (1, 3), -- 2
       (1, 4), -- 3
       (1, 6), -- 4
       (2, 2), -- 5
       (2, 3), -- 6
       (2, 5), -- 7
       (2, 6), -- 8
       (3, 1), -- 9
       (4, 4), -- 10
       (4, 3), -- 11
       (5, 2), -- 12
       (5, 5), -- 13
       (6, 2), -- 14
       (6, 3), -- 15
       (6, 5); -- 16     
-- requests
INSERT INTO request (request_text, request_user_id, request_user_name)
VALUES ('Please, add me to your project!', 1, 'tzafilkos'),    -- 1
       ('Please, add me to your project!', 3, 'nomikos'); -- 2
-- project_requests
INSERT INTO request_projects (project_id, request_id)
VALUES (6, 1), -- 1
       (5, 2); -- 2
-- messages
INSERT INTO message (message_text, message_user_name)
VALUES ('The project url is not responding.. Can u please check? 😢', 'pegias'), -- 1
       ('Yeah we were right.. Try it now it should be ok!😄', 'tripodis'),
       ('Yeah it works fine! Cheers..!! 😄', 'pegias'),
       ('Hello team! 😃', 'tzafilkos'),  -- 4
       ('Hi! 😄', 'nomikos'),   -- 5
       ('Hello!!! 🤗', 'tripodis');   -- 6
-- project_messages
INSERT INTO message_projects (project_id, message_id)
VALUES (6, 1), -- 1
       (6, 2), -- 2
       (6, 3), -- 3
       (1, 4), -- 4
       (3, 5), -- 5
       (1, 6); -- 6
