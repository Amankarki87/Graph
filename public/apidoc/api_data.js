define({ "api": [
  {
    "type": "get",
    "url": "/tasks/:id",
    "title": "Find a task",
    "group": "Tasks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Task id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Task id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Task title</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "done",
            "description": "<p>Task is done?</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update's date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Register's date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"title\": \"Study\",\n  \"done\": false\n  \"updated_at\": \"2016-02-10T15:46:51.778Z\",\n  \"created_at\": \"2016-02-10T15:46:51.778Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Task not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/loginController.js",
    "groupTitle": "Tasks",
    "name": "GetTasksId"
  }
] });
