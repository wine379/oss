import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  dashboardTitle: Cookies.get('darkMode'),
  showHeroImage: false,

  dashboardHouseholdHeadDetails: Cookies.get('dashboardHouseholdHeadDetails') ? JSON.parse(Cookies.get('dashboardHouseholdHeadDetails')) : '',
  dashboardHouseholdDetails: Cookies.get('dashboardHouseholdDetails') ? JSON.parse(Cookies.get('dashboardHouseholdDetails')) : '',
  dashboardLocationDetails: Cookies.get('dashboardLocationDetails') ? JSON.parse(Cookies.get('dashboardLocationDetails')) : '',
  dashboardTechnologyChoice: Cookies.get('dashboardTechnologyChoice') ? JSON.parse(Cookies.get('dashboardTechnologyChoice')) : '',
  dashboardPaymentDetails: Cookies.get('dashboardPaymentDetails') ? JSON.parse(Cookies.get('dashboardPaymentDetails')) : '',

  // registrationFirstName: Cookies.get('registrationFirstName') ? JSON.parse(Cookies.get('registrationFirstName')) : '',
  // registrationLastName: Cookies.get('registrationLastName') ? JSON.parse(Cookies.get('registrationLastName')) : '',
  // registrationDateOfBirth: Cookies.get('registrationDateOfBirth') ? JSON.parse(Cookies.get('registrationDateOfBirth')) : '',
  // registrationPhone: Cookies.get('registrationPhone') ? JSON.parse(Cookies.get('registrationPhone')) : '',
  // registrationNationalID: Cookies.get('registrationNationalID') ? JSON.parse(Cookies.get('registrationNationalID')) : '',
  // registrationEmail: Cookies.get('registrationEmail') ? JSON.parse(Cookies.get('registrationEmail')) : '',
  // registrationPassword: Cookies.get('registrationPassword') ? JSON.parse(Cookies.get('registrationPassword')) : '',
  // registrationConfirmPassword: Cookies.get('registrationConfirmPassword') ? JSON.parse(Cookies.get('registrationConfirmPassword'))  : '',
  // registrationHouseholdName: Cookies.get('registrationHouseholdName') ? JSON.parse(Cookies.get('registrationHouseholdName'))  : '',
  // registrationPlotNumber: Cookies.get('registrationPlotNumber') ? JSON.parse(Cookies.get('registrationPlotNumber'))  : '',
  // registrationLatrineType: Cookies.get('registrationLatrineType') ? JSON.parse(Cookies.get('registrationLatrineType')) : '',
  // registrationIncomeRange: Cookies.get('registrationIncomeRange') ? JSON.parse(Cookies.get('registrationIncomeRange')) : '',
  // registrationPovertyStatus: Cookies.get('registrationPovertyStatus') ? JSON.parse(Cookies.get('registrationPovertyStatus')) : '',
  // registrationSourceOfLivelihood: Cookies.get('registrationSourceOfLivelihood') ? JSON.parse(Cookies.get('registrationSourceOfLivelihood')) : '',
  // registrationVulnerabilityStatus: Cookies.get('registrationVulnerabilityStatus') ? JSON.parse(Cookies.get('registrationVulnerabilityStatus')) : '',
  // registrationArea: Cookies.get('registrationArea') ? JSON.parse(Cookies.get('registrationArea')) : '',
  // registrationWard: Cookies.get('registrationWard') ? JSON.parse(Cookies.get('registrationWard')) : '',
  // registrationBlockName: Cookies.get('registrationBlockName') ? JSON.parse(Cookies.get('registrationBlockName')) : '',
  // registrationStructureZone: Cookies.get('registrationStructureZone') ? JSON.parse(Cookies.get('registrationStructureZone')) : '',
  // registrationProduct: Cookies.get('registrationProduct') ? JSON.parse(Cookies.get('registrationProduct')) : '',
  // registrationPaymentOption: Cookies.get('registrationPaymentOption') ? JSON.parse(Cookies.get('registrationPaymentOption')) : '',
  // registrationWillPayInFull: Cookies.get('registrationWillPayInFull') ? JSON.parse(Cookies.get('registrationWillPayInFull')) : '',
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
    householdDetails: Cookies.get('householdDetails') ? JSON.parse(Cookies.get('householdDetails')) : '',
    location: Cookies.get('location') ? JSON.parse(Cookies.get('location')) : '',
    paymentMethod: Cookies.get('paymentMethod')  ? JSON.parse(Cookies.get('paymentMethod')) : '',
  },
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      Cookies.set('darkMode', 'ON');
      return {
        ...state,
        darkMode: true,
      };
    case 'DARK_MODE_OFF':
      Cookies.set('darkMode', 'OFF');
      return {
        ...state,
        darkMode: false,
      };
    case 'SET_DASHBOARD_TITLE':
        return {
          ...state,
          dashboardTitle: action.payload,
        };
    case 'HERO_IMAGE_ON':
      return {
        ...state,
        showHeroImage: true,
      };
    case 'HERO_IMAGE_OFF':
      return {
        ...state,
        showHeroImage: false,
      };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 365 });
      Cookies.set('cartIsEmpty', false);
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case 'CART_IS_EMPTY': {
      Cookies.set('cartIsEmpty', true);
      return {
        ...state,
        cart: {
          ...state.cart,
          cartIsEmpty: true,
        },
      };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 365 });
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };

    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: { cartItems: [], shippingAddress: '', paymentMethod: '' },
      };

    case 'SAVE_HOUSEHOLD_DETAILS':
      return {
        ...state,
        cart: {
          ...state.cart,
          householdDetails: action.payload,
        },
      };

    case 'SAVE_LOCATION':
      return {
        ...state,
        cart: {
          ...state.cart,
          location: action.payload,
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    case 'CLEAR_CART': {
      Cookies.set('cartIsEmpty', true);
      return {
        ...state,
        cart: { ...state.cart, cartIsEmpty: true, cartItems: [] },
      };
    }
    case 'FETCH_ORDER_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_ORDER_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_ORDER_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_ITEMS_REQUEST':
      return { ...state, loadingItems: true, errorItems: '' };
    case 'FETCH_ITEMS_SUCCESS':
      return {
        ...state,
        loadingItems: false,
        items: action.payload,
        errorItems: '',
      };
    case 'FETCH_ITEMS_FAIL':
      return { ...state, loadingItems: false, errorItems: action.payload };

    case 'FETCH_HOUSEHOLD_REQUEST':
      return { ...state, loadingHousehold: true, errorHousehold: '' };
    case 'FETCH_HOUSEHOLD_SUCCESS':
      return {
        ...state,
        loadingHousehold: false,
        household: action.payload,
        error: '',
      };
    case 'FETCH_HOUSEHOLD_FAIL':
      return {
        ...state,
        loadingHousehold: false,
        errorHousehold: action.payload,
      };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, sucessPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    case 'SET_ORDER_ITEMS':
      return { ...state, orderItems: action.payload };
    case 'SAVE_DASHBOARD_HOUSEHOLD_HEAD_DETAILS':
      return {
        ...state,
        dashboardHouseholdHeadDetails: action.payload,
      };
      case 'SAVE_DASHBOARD_HOUSEHOLD_DETAILS':
      return {
        ...state,
        dashboardHouseholdDetails: action.payload,
      };
      case 'SAVE_DASHBOARD_HOUSEHOLD_LOCATION_DETAILS':
      return {
        ...state,
        dashboardLocationDetails: action.payload,
      };
      case 'SAVE_DASHBOARD_TECHNOLOGY_CHOICE_DETAILS':
      return {
        ...state,
        dashboardTechnologyChoice: action.payload,
      };
      case 'SAVE_DASHBOARD_REGISTRATION_PAYMENT_DETAILS':
      return {
        ...state,
        dashboardPaymentDetails: action.payload,
      };
      
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
