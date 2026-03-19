package udhaya.example.ecommercewebsite.dto;

public class ApiResponse {

    private String message;
    private Object data;
    private boolean success;

    public ApiResponse(String message, Object data, boolean success) {
        this.message = message;
        this.data = data;
        this.success = success;
    }

    public static ApiResponse ok(String message, Object data) {
        return new ApiResponse(message, data, true);
    }

    public static ApiResponse error(String message) {
        return new ApiResponse(message, null, false);
    }

    public String getMessage() { return message; }
    public Object getData() { return data; }
    public boolean isSuccess() { return success; }
}