INSERT INTO "user" (id, password, salt, username)
    VALUES (
        '1a4f35f0-b4d6-43d1-87f8-84b2c4f30d08',
        '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578',
        'test',
        'test@test.com'
    )
    ON CONFLICT DO NOTHING;
