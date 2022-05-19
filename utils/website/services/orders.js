import axios from "axios";

const createOrder = async ({
  orderItemsArray,
  orderNumber,
  orderStatus,
  paymentOption,
  willPayFullForOSS,
  code,
  enrollmentStatus,
  adminNotes,
  blockName,
  plotNumber,
  name,
  mainSourceOfLiving,
  avarageMonthlyIncomeRange,
  homeOwnershipStatus,
  structureLocationZone,
  currentLatrineType,
  isVulnerable,
  isPoor,
  willPayFullForOSS
}) => {

  const { data } = await axios.post(
          '/api/orders/create',
          {
            orderItemsArray,
            orderNumber,
            orderStatus,
            paymentOption,
            willPayFullForOSS,
            code,
            enrollmentStatus,
            adminNotes,
            blockName,
            plotNumber,
            name,
            mainSourceOfLiving,
            avarageMonthlyIncomeRange,
            homeOwnershipStatus,
            structureLocationZone,
            currentLatrineType,
            isVulnerable,
            isPoor,
            willPayFullForOSS
          },
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        return {orderData: data}

};