const LOCAL_BASE_URL = process.env.REACT_APP_LOCAL_BASE_URL;
const PROD_BASE_URL = process.env.REACT_APP_PROD_BASE_URL;

const BASE_URL = process.env.REACT_APP_TYPE === "production" ? PROD_BASE_URL : LOCAL_BASE_URL;

const GET_ALL_CATEGORIES_URL = `${BASE_URL}/get_all_categories`;
const GET_EXPENSES_BY_CATEGORY_AND_SUBCATEGORY_URL = `${BASE_URL}/get_all_expense_by_categoryId_and_subCategoryId`;
const ADD_EXPENSE_URL = `${BASE_URL}/add_expense`;

export const ApiUrls = {
    GET_ALL_CATEGORIES_URL,
    GET_EXPENSES_BY_CATEGORY_AND_SUBCATEGORY_URL,
    ADD_EXPENSE_URL
}