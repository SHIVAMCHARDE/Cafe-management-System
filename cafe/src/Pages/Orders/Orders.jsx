import React, { useEffect, useRef } from 'react'
import useState from 'react-usestateref'
import { setIsLogged } from '../../States/action-creators/index'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acitionCreators } from '../../States/index'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import './Orders.css'
import { createRoot } from 'react-dom/client'
import OrderList from '../../Components/OrderList/OrderList'
import CreditCard from '../../Assets/Icons/CreditCard.svg'
import FloatingNav from '../../Components/FloatingNav/FloatingNav'

export default function Orders() {

  var [orders, setOrders, orderRef] = useState()
  const [cafeName, setCafeName] = useState()
  const [tableNo, setTableNo] = useState()
  const [totalAmount, setTotalAmount] = useState()
  const orderContainer = useRef()

  const dispatch = useDispatch()
  const { setIsLogged } = bindActionCreators(acitionCreators, dispatch)
  const navigate = useNavigate()

  const user = useSelector(state => state.User)

  if (!user.isAuthenticated) {
    window.location.href = '/login'
  }

  useEffect(() => {

    const order = localStorage.getItem('orderList')
    setOrders(localStorage.getItem('orderList'))

    let TableNo = decodeURI((window.location.href).split('table=')[1])

    if (TableNo === undefined) {
      setCafeName(decodeURI((window.location.href).split('name=')[1]))
    }

    else {

      setTableNo(TableNo)
      let cafeName = decodeURI(((window.location.href).split('=')[1]).split('&')[0])
      setCafeName(cafeName)

    }

    let orderList = []

    try {

      JSON.parse(orderRef.current).forEach(element => {

        orderList.push(<OrderList data={element} amount={getVal} />)

      });

    } catch (e) { }

    const root = createRoot(orderContainer.current)

    root.render(orderList)

  }, [])


  useEffect(() => {


    if (orders !== undefined) {

      let amount = 0

      try {


        JSON.parse(orderRef.current).forEach(ele => {
          amount += ele.price
        })

        setTotalAmount(amount)
      } catch (e) { }
    }


  }, [orders])

  function getVal(values) {

    let list = JSON.parse(orderRef.current)

    list.forEach(element => {
      if (element.id === values.id) {

        element.qty = values.qty
        element.price = values.price

      }

    });

    setOrders(JSON.stringify(list))


  }

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  async function displayRazorpay(amount) {
    const script = document.createElement("script");

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_3E1BxGvOlZaNIf",
      currency: "INR",
      amount: amount*100,
      name: "Cafe Managment System",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        console.log(response.razorpay_payment_id);

        

        window.location.href = '/paymentSuccess'
      },
      prefill: {
        name: "Cafe Managment System",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (

    <>
      <section>

        <SearchBar />

        <div className="cafeInfo">

          <p> {cafeName}</p>

          {tableNo === 'undefined' ? "" :
            <p className='orderTable' >{`Your Order ( Table No ${tableNo} )`}</p>
          }

        </div>

        <div className="orderContainer" ref={orderContainer}>

        </div>

        <hr className='dashedLine' />

        <div className="total">
          <p>Total Amount</p>
          <p>{totalAmount} Rs/-</p>
        </div>

        <div onClick={() => {
          displayRazorpay(totalAmount);
        }} >
          <FloatingNav text={'Pay'} icon={CreditCard} />
        </div>

      </section>

    </>

  )
}
