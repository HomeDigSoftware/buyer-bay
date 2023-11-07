import React, { useEffect, useState, useRef } from "react";
import "../../App.css"
import supabase from "../../services/supabase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { data } from "autoprefixer";





export default function AddTokens({userTokens , setUserTokens}) {
    const [openMenu, setOpenMenu] = useState(false);
    const [show, setShow] = React.useState(false);
    const [user, setUser] = useState({});
    // const [userTokens, setUserTokens] = useState("");
    const [message, setMessage] = useState(false);

    return (
        <div>
            <button className="token-btn m-4 btn btn-secondary"
                // onClick={() => checkTokens({ openMenu, setOpenMenu, setShow })}
                onClick={() => openTokenMenu(setShow, setUserTokens, setMessage)}
                href="#"
            >Add Tokens</button>
            {message ? <LoginMessage setMessage={setMessage}/> : ""}
            {/* {openMenu ? <div>
                    {() => setModalShow(true)}</div>: <div></div>} */}
            <MyVerticallyCenteredModal show={show} onHide={() => setShow(false)} currentUser={user} userTokens={userTokens} setUserTokens={setUserTokens} />

        </div>
    )
}

function LoginMessage({setMessage}) {
    return (
        <div className="panel-background" onClick={() => setMessage(false)}>a
            < div className="login-message mt-10 p-20" id='linksToVisitPage'  >
                you need to loged in to buy Tokens
            </div>
        </div>
    )
}

function openTokenMenu(setShow, setUserTokens, setMessage) {
    //  setShow(true);
    checkTokens(setUserTokens, setShow, setMessage);


}

// async function checkTokens({ openMenu, setOpenMenu, setShow }) {
const checkTokens = async (setUserTokens, setShow, setMessage) => {
    const { data: { user } } = await supabase.auth.getUser()
    // const _data = "";
    // let { data: accounts, error } = await supabase
    //     .from('accounts')
    //     .select('*')

    // accounts.map((data) => {
    //     console.log(data);
    // })

    console.log(data, "get-user-data", user)
    if (user) {
        let { data: tokens, error02 } = await supabase
            .from('accounts')
            .select('tokens')
            .eq('user_id', user.id)
        tokens.map((data) => {
            // console.log(data)}
            console.log('you have :', data.tokens, " tokens")
            // setUserTokens(tokens)
            //  _data = tokens;
            updateTokens(data.tokens, setUserTokens, setShow, user?.aud)
        })
    }
    else {
        console.log("you need to loged in to buy Tokens")
        setMessage(true)
    }

    // setUserTokens(_data);
    // const { data: { theUser } } = await supabase.auth.getUser()
    // const _user = theUser;
    // getTheUser({currentUser ,setUser})


}

// async function getTheUser({currentUser , setUser}){
//     const { data: { user } } = await supabase.auth.getUser()
//     console.log(user.id)
//     const _user = user
//    // setUser(_user);
// }

function updateTokens(tokens, setUserTokens, setShow, user) {
    if (user === "authenticated") {
        setUserTokens(tokens);
        setShow(true);
    } else {
        console.log("You need to LogIn For buying Tokens")
    }

    console.log(tokens)
}


function MyVerticallyCenteredModal({ onHide, show, userTokens, setUserTokens }) {
    //  const display =  show ?  checkTokens(setUserTokens ) : "";
    return (
        <Modal show={show}
            // {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="add-tokens-header">
                <Modal.Title id="contained-modal-title-vcenter">
                    Buy Tokens
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="add-tokens-body">
                <h4>Centered Modal</h4>

                <Container className="add-tokens-menu">
                    <Row>
                        <Col className="sections col-6" >
                            <button className="token-btn m-2 btn btn-secondary" onClick={() => { AddTokenAmount(500, userTokens, setUserTokens) }} >Buy 500 tokens</button>
                        </Col>
                        <Col className="sections col-6">
                            <button className="token-btn m-2 btn btn-secondary" onClick={() => { AddTokenAmount(1000, userTokens, setUserTokens) }}>Buy 1000 tokens</button>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={4} className="sections">
                            <button className="token-btn m-2 btn btn-secondary" onClick={() => { AddTokenAmount(5000, userTokens, setUserTokens) }}>Buy 5000 tokens</button>
                        </Col>
                        <Col xs={6} md={4} className="sections">
                            <button className="token-btn m-2 btn btn-secondary" onClick={() => { AddTokenAmount(10000, userTokens, setUserTokens) }}>Buy 10000 tokens</button>
                        </Col>
                        <Col xs={6} md={4} className="sections">
                            <button className="token-btn m-2 btn btn-secondary" onClick={() => { AddTokenAmount(100000, userTokens, setUserTokens) }}>Buy 100000 tokens</button>

                        </Col>
                    </Row>
                </Container>
            </Modal.Body >
            <Modal.Footer className="add-tokens-header">
                <h3>you have : {userTokens} Tokens</h3>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

async function AddTokenAmount(amount, userTokens, setUserTokens) {
    const { data: { user } } = await supabase.auth.getUser()
    // if(user !== null) {
    //  console.log(user.aud)
    //  console.log(user.email)

    // const { data02, insert_error } = await supabase
    // .from('accounts')
    // .insert([
    //   { tokens: amount ,
    //     user_id: user.id , 
    //     email: user.user_metadata.email , 
    //     user_name: user.user_metadata.name ,
    // } 

    // ])
    // .select()

    const { data, update_error } = await supabase
        .from('accounts')
        .update({ tokens: (amount + userTokens) })
        .eq("user_id", user.id)
        .select()

    console.log(userTokens + amount, "insert 500 tokens", "user.id", "DATA", user.id, user.user_metadata.email, user.user_metadata.name)
    setUserTokens(amount + userTokens)
    // console.log(user )
}

// async function UpdateTokens(){
//     const { data, error } = await supabase
//     .from('accounts')
//     .update({ tokens: "500" })
//     .eq(user_id , 'someValue')
//     .select()
// }