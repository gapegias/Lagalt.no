-- lagalt_users
INSERT INTO lagalt_user (user_name)
VALUES ('George Tzafilkos'),    -- 1
       ('George Pegias'),       -- 2
       ('Nomikos Kampourakis'), -- 3
       ('Giannis Tripodis');    -- 4
-- topics
INSERT INTO topic (topic_name)
VALUES ('MUSIC'),            -- 1
       ('FILMS'),            -- 2
       ('GAME DEVELOPMENT'), -- 3
       ('WEB DEVELOPMENT');  -- 4
-- projects
INSERT INTO project (project_title, project_purpose, project_owner, topic_id)
     VALUES ('Jazz Concert Party', 'Organizing a music festival with jazz musicians.', 'George Tzafilkos', 1);  -- 1
INSERT INTO project (project_title, project_purpose, project_owner, topic_id)
     VALUES ('The Avengers: Funmade', 'Filming a funmade movie of first avenger movie.','George Pegias', 2);    -- 2
INSERT INTO project (project_title, project_owner, topic_id)
     VALUES ('Pokemon-Trainer-WEB-App', 'Nomikos Kampourakis', 4);                                              -- 3
INSERT INTO project (project_title, project_owner, project_repo_url, topic_id)
     VALUES ('Lagalt-No-WEB-App', 'Giannis Tripodis', 'https//:github.com/something', 4);                       -- 4
-- lagalt_user_projects
INSERT INTO lagalt_user_projects (user_id, project_id)
VALUES (1, 1), -- 1
       (1, 4), -- 2
       (2, 2), -- 3
       (2, 4), -- 4
       (3, 3), -- 5
       (3, 4), -- 6
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
-- requests
INSERT INTO request (request_text, project_id, user_id)
VALUES ('Please, add me to your project!', 3, 2), -- 1
       ('Please, add me to your project!', 1, 4); -- 2
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
-- messages
INSERT INTO message (message_text, user_id, project_id)
VALUES ('I did not get it ... 😢', 1, 1), -- 1
       ('Hello team! 😃', 2, 4),          -- 2
       ('Hi! 😄', 3, 4),                  -- 3
       ('Perfect 🤗', 4, 4);              -- 4