-- lagalt_users
INSERT INTO lagalt_user (user_name, user_hide)
     VALUES ('George Tzafilkos', false);                                                    -- 1
INSERT INTO lagalt_user (user_name, user_about_me, user_hide)
     VALUES ('George_Pegias', 'My name is George and I live in Athens of Greece!', false);  -- 2
INSERT INTO lagalt_user (user_name, user_hide)
     VALUES ('Nomikos Kampourakis', false);                                                 -- 3
INSERT INTO lagalt_user (user_name, user_hide)
     VALUES ('Giannis Tripodis', false);                                                    -- 4
-- projects
INSERT INTO project (project_title, project_purpose, project_owner, project_topic)
     VALUES ('Jazz Concert Party', 'Organizing a music festival with jazz musicians.', 'George Tzafilkos', 'MUSIC'); -- 1
INSERT INTO project (project_title, project_purpose, project_owner, project_topic)
     VALUES ('The Avengers: Funmade', 'Filming a funmade movie of first avenger movie.','George_Pegias', 'FILMS');   -- 2
INSERT INTO project (project_title, project_owner, project_topic)
     VALUES ('Pokemon-Trainer-WEB-App', 'Nomikos Kampourakis', 'GAME DEVELOPMENT');                                  -- 3
INSERT INTO project (project_title, project_owner, project_repo_url, project_topic)
     VALUES ('Lagalt-No-WEB-App', 'Giannis Tripodis', 'https//:github.com/something', 'WEB DEVELOPMENT');            -- 4
-- lagalt_user_projects
INSERT INTO lagalt_user_projects (project_id, user_id)
VALUES (1, 1), -- 1
       (4, 1), -- 2
       (2, 2), -- 3
       (4, 2), -- 4
       (3, 3), -- 5
       (4, 3), -- 6
       (4, 4); -- 7
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
VALUES (1, 1), -- 1
       (3, 3), -- 2
       (3, 4), -- 3
       (4, 1), -- 4
       (4, 3), -- 5
       (4, 4); -- 6
-- project_skills
INSERT INTO project_skills (project_id, skill_id)
VALUES (1, 2), -- 1
       (1, 3), -- 2
       (1, 4), -- 3
       (2, 1), -- 4
       (2, 2), -- 5
       (2, 3), -- 6
       (3, 5), -- 7
       (4, 5); -- 8
-- requests
INSERT INTO request (request_text, request_user_id, request_user_name)
VALUES ('Please, add me to your project!', 2, 'George_Pegias'),    -- 1
       ('Please, add me to your project!', 4, 'Giannis Tripodis'); -- 2
-- project_requests
INSERT INTO request_projects (project_id, request_id)
VALUES (3, 1), -- 1
       (1, 2); -- 2
-- messages
INSERT INTO message (message_text, message_user_name)
VALUES ('I did not get it ... 😢', 'George Tzafilkos'), -- 1
       ('Hello team! 😃', 'George_Pegias'),             -- 2
       ('Hi! 😄', 'Nomikos Kampourakis'),               -- 3
       ('Perfect 🤗', 'Giannis Tripodis');              -- 4
-- project_messages
INSERT INTO message_projects (project_id, message_id)
VALUES (1, 1), -- 1
       (4, 2), -- 2
       (4, 3), -- 3
       (4, 4); -- 4