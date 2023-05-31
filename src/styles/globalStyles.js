import { createGlobalStyle } from "styled-components";
import { COLORS } from "../values/colors";

export const GlobalStyle = createGlobalStyle`
    *,html{
        /* font-size: 61.6%; */
        font-size: 62.5%;
        // font-size: 70.5%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Outfit";
        scroll-behavior: smooth;
    }
    
    body{
        background-image: linear-gradient(75deg, #fff ,#fff) !important;
        color: ${COLORS.black5};
        /* background-image: linear-gradient(120deg, #603296 0%, #c00fb1 100%); */
        
        & h2{
            font-size: 1.8rem;

            &.pd{
                padding: 0 0 1rem 0;
            }
        }
        & h3{
            font-size: 1.4rem;
        }

        & p{
            font-size: 1.4rem;
        }
        & input{
            font-size: 1.5rem;
            font-weight: 400;
            color: ${COLORS.black2};
            border: none;
            outline: none;
            background-color: ${COLORS.white4};
            // border: 1px solid rgba(0,0,0,.09);
            
            &:focus{
                // border: 1px solid rgba(0,0,0,.4);
            }
        }
        
        & input[type="button"],input[type="submit"]{
            border: 1px solid transparent;
            color: ${COLORS.white};
            cursor: pointer;
            /* padding: .8rem; */
            border-radius: .3rem;
            transition: 150ms ease-in-out;

            &:focus{
                border: 1px solid ${COLORS.black2};
            }
        }
        & input[type="file"]{
            /* color: ${COLORS.white}; */
            cursor: pointer;
            width: 20rem;
            height: 20rem;
            padding: .5rem;
            border-radius: .3rem;
            /* width: 100%; */
            margin: 1rem auto;

        }
        
        & input[type="checkbox"]{
            background-color: ${COLORS.white};
        }
        
        & .button__row{
            display: flex;
            margin: auto;
            justify-content: left;
            
            & input{
                height: 3.5rem;
                /* width: auto; */
                width: 100%;
                padding: 0 1rem;
            }

            &.button__left{
                & .full__width{
                width: 100%;
            }

            }

            &.button__left input{
                width: auto;
            }
        }
        & .row{
            display: flex;
            // width: 100%;
            flex-wrap: wrap;
            justify-content: left;
            /* justify-content: space-between; */
            /* background-color: rebeccapurple; */
            /* height: 10rem; */
            /* margin: .5rem 0; */
            & .label__group{
                align-self: flex-end;
            }
            
            &.full__width{
                width: 100%;
            }
        }
        & .input__row{
            display: flex;
            // width: 100%;
            // flex-wrap: wrap;
            justify-content: left;
            /* justify-content: space-between; */
            /* background-color: rebeccapurple; */
            /* height: 10rem; */
            /* margin: .5rem 0; */
            & .label__group{
                align-self: flex-end;
            }
            
            &.full__width{
                width: 100%;
            }
        }

        & .row2{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        @media only screen and (max-width: 1024px) {
            
            & .row2{
                display: block;
            }
            & .input__row{
                display: block;
            }
        }

        & .align__center{
            justify-content: center; 
        }

        & form .label__group{
            width: 100%;
            margin-top: .5rem;
            margin-right: .7rem;
            /* height: 6rem; */
            color: ${COLORS.grey};
            justify-content: center;
            text-align: left;
        }
        
        & form .label__group label{
            margin-bottom: .5rem;
            width: 100%;
        }
        & form .label__group:last-child{
            margin-right: 0;
        }

        & form input{
            width: 100%;
            padding: 0.9rem;
            border-radius: .3rem;
            background-color: ${COLORS.white4};
        }
        & form input[type="date"]{
            padding: 0.75rem;
        }
        & input, label{
            display:block;
        }

        & .label__group label{
            color: ${COLORS.grey};
        }

        & textarea { 
            /* will prevent resizing horizontally */
            resize: none;
            background-color: ${COLORS.white3};
            font-size: 1.5rem;
            width: 100%;
            padding: 1rem;
            margin: 0;
            border-radius: .3rem;
            /* background-color: transparent; */
            color: ${COLORS.black2};
            outline: none;
            border: none;
            border: 1px solid rgba(0,0,0,.09);
            
            &:focus{
                border: 1px solid rgba(0,0,0,.4);
            }

        }
        
        & a{
            text-decoration: none;
        }
        & label{
            font-size: 1.5rem;
        }
        & button{
            border: none;
        }

        & table{
            border-radius: .3rem;
            font-size: 5rem;
            width: 100%;
            border-collapse: collapse;
            & tr{
                /* border: none; */
                white-space:nowrap;
                &:nth-child(even) {
                    background-color: ${COLORS.white3};
                }
                &:nth-child(odd) {
                    background-color: ${COLORS.white2};
                }
            }
            & th{
                position: sticky;
                top: 0;
                font-weight: 500;
                text-align: left;
                color: ${COLORS.white};
                white-space:nowrap;
                background-color: ${COLORS.black2};
                padding: .7rem .5rem;
                
                &:first-child{
                    position: sticky;
                    left: 0;
                    top: 0;
                    z-index: 10;
                }
                
                &:first-child{
                    /* border: 1px solid ${COLORS.black7}; */
                    border-radius: .5rem 0 0 0;
                }
                
                &:last-child{
                    border-radius: 0 .5rem 0 0;
                }
            }
            & .td__ps :where(th, td){
                width: 20%;
            }
            & .td2__ps :where(th,td){
                width: 40%;
            }
            & :where(.td__ps,.td2__ps) th{
                background-color: ${COLORS.black2};
            }
            
            & td{
                /* border: none; */
                /* background-color: ${COLORS.white}; */
                /* border-bottom: 1px solid ${COLORS.white3}; */
                padding: .6rem .5rem;
                color: ${COLORS.black2};
                font-weight: 500;
                &:first-child{
                    position: sticky;
                    left: 0;
                    background-color: inherit;
                }

                & .action__icons{
                    display: flex;
                }
            }

        }
        & .icons{
            padding: .2rem;
            font-size: 1.4rem;
            border-radius: .3rem;
            cursor: pointer;
            color: ${COLORS.black5};
            margin: auto 1rem auto 0;
            
            &:last-child{
                margin-right: 0;
            }
        }
        & .icons2{
            padding: .2rem;
            font-size: 3rem;
            border-radius: .3rem;
            cursor: pointer;
            color: ${COLORS.white};
            margin: auto 1rem auto 0;
            
            &:last-child{
                margin-right: 0;
            }
        }

        & .form__input{
            position: relative;
            padding: .1rem 0;
        }
        
        & .password__toggle{
            position: absolute;
            top: 2.1rem;
            right: .5rem;
            margin: 1.2rem .5rem 0 0;
            font-size: 1.6rem;
            color: ${COLORS.grey2};
            cursor: pointer;
        }

        //////////////////////////
        /* Modal Popup Section */
        //////////////////////////
 
        & .row__item{
            width: 100%;
            & h2 span{
                font-size: 1.5rem;
                color: ${COLORS.grey2};
                font-weight: 400;
            }

        }

        & .emp__payheads{
            margin: auto;
            justify-content: center;
        }

        & h2{
            font-size: 1.5rem;

            & span{
                color: ${COLORS.black7};
                font-weight: 400;
                font-size: 1.5rem;
            }
        }
        & p{
            margin: auto 0;
        }
        & .general__btn {
            // width: 100%;
            padding: .5rem .8rem;
            color: ${COLORS.white};
            border-radius: 0.3rem;
        }
        & .delete__btn{
            background-color: ${COLORS.red};
            transition: 150ms ease-in-out;
        }
        & .delete__btn:hover{
            background-color: ${COLORS.red2};
        }
        & .cancel__btn{
            background-color: ${COLORS.black2};
            transition: 150ms ease-in-out;
        }
        & .cancel__btn:hover{
            background-color: ${COLORS.black7};
        }
        & .save__btn{
            background-color: ${COLORS.blue};
            transition: 150ms ease-in-out;
            &:hover{
                background-color: ${COLORS.blue2};
            }
        }
        & .green__btn{
            background-color: ${COLORS.green};
            transition: 150ms ease-in-out;
        }
        & .green__btn:hover{
            background-color: ${COLORS.green2};
        }
        & .red__text{
            color: ${COLORS.red};
            /* color: red; */
            /* padding: 2rem; */
            margin-left: .3rem;
            margin-top: .2rem;
            position: absolute;
        }
        & .disabled__btn{
            background-color: ${COLORS.grey3};
            &:hover{
                cursor: not-allowed;
            }
        }
        & .margin__top{
            margin-top: 1rem;
        }

        & .margin__bottom{
            margin-bottom: 1rem;
        }

        & .margin__right{
            margin-right: 1rem;
        }

        & .margin__left{
            margin-left: 1rem;
        }

        & .margin__left2{
            margin-left:1rem;
        }

        & .btn__padding{
            padding: .6rem .8rem;
        }

        & .align__right{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        & .aligntext__right {
            text-align: right;
            width: fit-content;
        }

        & .aligntext__left {
            text-align: left;
            width: fit-content;
        }

        & .justify__btw{
            justify-content: space-between;
        }

        & .full__width{
            width: 100%;
        }

        @media only screen and (max-width: 1024px) {
            & .margin__left{
                margin-left:1rem;
            }
            & .margin__left2{
                margin-left:0;
            }
            & .margin__left:last-child{
                margin-left: 0;
            }

            & .general__btn {
                width: 100%;
            }

            & .align__center{
                justify-content: center;
            }
           
        }


        /////////////////////////
        /////StatusCode/////////
        ////////////////////////
        & .generated,
          .not__approved,
          .pre__approved,
          .rejected,
          .approved{
            font-size: 1.3rem;
            width: 80%;
            padding: .3rem .5rem;
            border-radius: .3rem;
            font-weight: 400;
            color: #fff;
        }
        & .generated{
            background-color: ${COLORS.blue2};
        }
        & .not__approved{
            background-color: ${COLORS.grey3};
        }
        & .pre__approved{
            background-color : ${COLORS.yellow}
        }
        & .rejected{
            background-color : ${COLORS.red2}
        }
        & .approved{
            background-color : ${COLORS.green}
        }

        //////////////////////////
        ////EmpView Section///////
        //////////////////////////
        & .emp__content{
            display: flex;
            margin: 1.5rem 0;
            width: 100%;
            justify-content: space-evenly;
            & .payhead__section{
                background-color: ${COLORS.white4};
                width: 100%;
                padding: .7rem;
                border-radius: .3rem;

                & .list__items{
                    max-height: 20rem;
                    overflow: auto;
                    -ms-overflow-style: none;
                    scrollbar-width: none;

                    &::-webkit-scrollbar {
                        /* display: none; */
                        position: absolute;
                        width: .5rem;
                        /* border: 3px solid goldenrod; */
                    }
                    &::-webkit-scrollbar-track {
                        background-color: ${COLORS.white};
                    }

                    &::-webkit-scrollbar-thumb {
                        background: ${COLORS.grey};
                        border-radius: 10rem;
                    }

                    & .item{
                        /* padding: 0 .5rem; */
                    }
                }

                & .line{
                    padding: 0 0 1rem .5rem;
                    margin-bottom: .5rem;
                    width: 100%;
                    justify-content: space-between;
                    border-bottom: 1px solid ${COLORS.white};

                    & p{
                        font-size: 1.3rem;
                        margin-left: 0;
                    }

                    & h2{
                        margin-top: .9rem;
                    }
                    
                    & .icons{
                        font-size: 1.5rem;
                        margin-top: .9rem;
                        margin-left: 1rem;
                        padding: .4rem;
                        width: 2rem;
                        height: 2rem;
                        border-radius: 50%;
                        box-shadow: 0 0 1rem rgba(0,0,0,.09);
                        background-color: ${COLORS.white2};
                        color: ${COLORS.green};
                    }
                }
                & .delete{
                    margin-left: 1rem;
                    padding: .4rem;
                    height: 2rem;
                    width: 2rem;
                    font-size: .5rem;
                    border-radius: .5rem;
                    cursor: pointer;
                    color: ${COLORS.white};
                    background-color: ${COLORS.red};
                }
            }
        }
    
        & .month__view{
            width: 50rem;
            color: ${COLORS.black5};
            margin: auto;
            padding: 3rem;
            border-radius: .4rem;
            background-color: ${COLORS.white};

            & .month__top{
                padding: 0 .5rem;

                & h2:last-child{
                    margin-left: 1rem;
                }
            }

            & h2{
                margin-bottom: 1rem;
            }

        }

        & .delete__container{
            width: 100%;
            margin: auto;
            color: ${COLORS.black5};
            padding: 3rem;
            border-radius: .4rem;
            background-color: ${COLORS.white};
            
            & h2{
                text-align: center;
                margin-bottom: 1rem;
            }

        }

        & .successful__container{
            margin: auto;
            color: ${COLORS.black5};
            padding: 3rem;
            border-radius: .4rem;
            background-color: ${COLORS.white};

            & .success__icon{
                margin: auto 1rem auto auto;
                padding: .4rem;
                font-size: 2.3rem;
                color: ${COLORS.white};
                border-radius: 50%;
                background-color: ${COLORS.green2};
            }

            & h3{
                /* text-align: center; */
                font-size: 1.7rem;
                margin: auto;
            }
        }
        
        & .error__msg{
            width: 100%;
            padding: .5rem;
            margin: .5rem 0 2rem 0;
            display: flex;
            position: relative;
            z-index: 1;
            background-color: ${COLORS.red3};
            border-radius: .3rem;
            border: 1px solid ${COLORS.red4};
            transition: 360ms ease-in-out;
            justify-content: center;
            & p{
                margin: auto;
                text-align: center;
                font-size: 1.5rem;
                color: ${COLORS.red};
            }
        }
        & .error__msg2{
            // width: 100%;
            padding: 1rem;
            // margin: .5rem 0 2rem 0;
            display: flex;
            position: fixed;
            z-index: 99;
            // left:0;
            right:2rem;
            bottom: 4rem;
            background-color: ${COLORS.red3};
            border-radius: .3rem;
            border: 1px solid ${COLORS.red4};
            transition: 360ms ease-in-out;
            justify-content: center;
            & p{
                margin: auto;
                text-align: center;
                font-size: 1.6rem;
                color: ${COLORS.red};
            }
        }
        
        @media only screen and (max-width: 1024px) {
            & .error__msg2{
                right:2rem;
                left:2rem;
            }
        }

        & .error{
            margin-top: -.4rem;
            color: ${COLORS.red2};
            margin-bottom: 2rem;
            /* margin: 1rem 0; */
            /* position: absolute; */
            z-index: 100;
            padding: .3rem;
            border-radius: .3rem;
            /* background-color: ${COLORS.grey}; */
            /* background-color: rgba(0,0,0,.5); */
            font-weight: 400;
            font-size: 1.2rem;
        }

        & .no__data{
        color: ${COLORS.grey};
        font-size: 1.4rem;
        margin-top: 1rem;
        text-align: center;
        }

        & .comment__container{
            width: 100%;
            margin: auto;
            /* width: 200px; */
            /* height: 200px; */
            background-color: ${COLORS.white2};
            padding: 3rem 2rem;
            border-radius: .3rem;
            /* text-align: center; */
            
            & h1{
                font-size: 1.4rem;
                color: ${COLORS.black2};
            }
        }

        // custom upload file input

        & .upload_empfile {
            /* width: 30rem; */
            display: flex;
            border-radius: .3rem;
            margin: 1rem auto;
            /* margin-top: 1rem; */
            background-color: ${COLORS.white4};
            color: ${COLORS.black2};
            border: 1px solid ${COLORS.black2};
            
            & p {
                font-size: 1.5rem;
                margin: auto auto auto 1rem;
            }

            & .choose__btn {
                padding: 1rem;
                height: 100%;
                background-color: ${COLORS.black2};
                justify-content: center;
                margin: auto 0 auto 0;
                color: ${COLORS.white};
                cursor: pointer;
                transition: 150ms ease-in-out;
                
                &:hover{
                    background-color: ${COLORS.black7};
                }
            }
        }


        & .uploadslipexcel__container{
            width: 100%;
            margin: auto;
            /* width: 200px; */
            /* height: 200px; */
            background-color: ${COLORS.white2};
            padding: 3rem 2rem;
            border-radius: .3rem;
            /* text-align: center; */
            
            & h1{
                font-size: 1.4rem;
                color: ${COLORS.black2};
            }
        }

        & .option__container{
            border-radius: .3rem;
            background-color: ${COLORS.white2};
            padding: 2.3rem 2rem;
            width: 100%;

            & h1{
                font-size: 1.8rem;
                text-align: center;
                color: ${COLORS.black2};
            }
            
        }
    }
`;
