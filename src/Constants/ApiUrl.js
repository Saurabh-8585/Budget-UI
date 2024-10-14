const LOCAL_BASE_URL = process.env.REACT_APP_LOCAL_BASE_URL;
const PROD_BASE_URL = process.env.REACT_APP_PROD_BASE_URL;

const BASE_URL = process.env.REACT_APP_TYPE === "production" ? PROD_BASE_URL : LOCAL_BASE_URL;

const GET_ALL_CATEGORIES_URL = `${BASE_URL}/api/category/get_all_categories`;
const GET_EXPENSES_BY_CATEGORY_AND_SUBCATEGORY_URL = `${BASE_URL}/api/expense/get_all_expense_by_categoryId_and_subCategoryId`;
const ADD_EXPENSE_URL = `${BASE_URL}/api/expense/add_expense`;
const GET_LAST_WEEk_EXPENSE = `${BASE_URL}/api/expense/get_last_week_expense`
const GET_CURRENT_MONTH_EXPENSE = `${BASE_URL}/api/expense/get_current_month_expense`
const GENERATE_MOCK_DATA = `${BASE_URL}/api/expense/generate_mock_data`



export const ApiUrls = {
    GET_ALL_CATEGORIES_URL,
    GET_EXPENSES_BY_CATEGORY_AND_SUBCATEGORY_URL,
    ADD_EXPENSE_URL,
    GET_CURRENT_MONTH_EXPENSE,
    GET_LAST_WEEk_EXPENSE,
    GENERATE_MOCK_DATA
}