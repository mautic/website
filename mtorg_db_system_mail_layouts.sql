CREATE TABLE mtorg_db.system_mail_layouts
(
    id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(191),
    code varchar(191),
    content_html text,
    content_text text,
    content_css text,
    is_locked tinyint(1) DEFAULT 0 NOT NULL,
    created_at timestamp,
    updated_at timestamp
);
INSERT INTO mtorg_db.system_mail_layouts (id, name, code, content_html, content_text, content_css, is_locked, created_at, updated_at) VALUES (1, 'Default layout', 'default', '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <style type="text/css" media="screen">
        {{ brandCss|raw }}
        {{ css|raw }}
    </style>

    <table class="wrapper layout-default" width="100%" cellpadding="0" cellspacing="0">

        <!-- Header -->
        {% partial ''header'' body %}
            {{ subject|raw }}
        {% endpartial %}

        <tr>
            <td align="center">
                <table class="content" width="100%" cellpadding="0" cellspacing="0">
                    <!-- Email Body -->
                    <tr>
                        <td class="body" width="100%" cellpadding="0" cellspacing="0">
                            <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0">
                                <!-- Body content -->
                                <tr>
                                    <td class="content-cell">
                                        {{ content|raw }}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Footer -->
        {% partial ''footer'' body %}
            &copy; {{ "now"|date("Y") }} {{ appName }}. All rights reserved.
        {% endpartial %}

    </table>

</body>
</html>', '{{ content|raw }}', '@media only screen and (max-width: 600px) {
    .inner-body {
        width: 100% !important;
    }

    .footer {
        width: 100% !important;
    }
}

@media only screen and (max-width: 500px) {
    .button {
        width: 100% !important;
    }
}', 1, '2018-05-01 13:39:22', '2018-05-01 13:39:22');
INSERT INTO mtorg_db.system_mail_layouts (id, name, code, content_html, content_text, content_css, is_locked, created_at, updated_at) VALUES (2, 'System layout', 'system', '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <style type="text/css" media="screen">
        {{ brandCss|raw }}
        {{ css|raw }}
    </style>

    <table class="wrapper layout-system" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center">
                <table class="content" width="100%" cellpadding="0" cellspacing="0">
                    <!-- Email Body -->
                    <tr>
                        <td class="body" width="100%" cellpadding="0" cellspacing="0">
                            <table class="inner-body" align="center" width="570" cellpadding="0" cellspacing="0">
                                <!-- Body content -->
                                <tr>
                                    <td class="content-cell">
                                        {{ content|raw }}

                                        <!-- Subcopy -->
                                        {% partial ''subcopy'' body %}
                                            **This is an automatic message. Please do not reply to it.**
                                        {% endpartial %}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>', '{{ content|raw }}


---
This is an automatic message. Please do not reply to it.', '@media only screen and (max-width: 600px) {
    .inner-body {
        width: 100% !important;
    }

    .footer {
        width: 100% !important;
    }
}

@media only screen and (max-width: 500px) {
    .button {
        width: 100% !important;
    }
}', 1, '2018-05-01 13:39:22', '2018-05-01 13:39:22');