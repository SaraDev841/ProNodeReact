import { useParams } from "react-router-dom"
import { useSingleProductQuery } from "./productsApiSlice"
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { useAddFirstMutation } from "../basket/BasketApiSlice";
import { useSelector } from "react-redux";
import { Toast } from 'primereact/toast';
import { useRef,useEffect } from "react";

const SingleProduct = () => {
    const { id } = useParams()
    const { data: product, isLoading, error } = useSingleProductQuery(id)
    const [addFirst,{isSuccess,isError,error:addError}] = useAddFirstMutation()
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const toast = useRef(null);

     useEffect(()=>{
            if(isError){
            toast.current.show({ severity: 'info', summary: 'Message', 
                detail: addError.data.message, life: 3000 })
            }else if(isSuccess){
            toast.current.show({ severity: 'success', summary: 'Success', 
                detail:"המוצר נוסף לסל בהצלחה", life: 3000 })
            }
        },[isSuccess,isError])

    if (isLoading) return <div>טוען פרטי מוצר...</div>;
    if (error || !product) return <div>שגיאה בטעינת המוצר או מוצר לא קיים</div>;

    return (
        <Card className="product-card p-4" >
            <Toast ref={toast} />
            <div className="flex gap-4">
                <div className="flex-1" dir="rtl">
                    <Divider />
                    <h1>{product.name}</h1>
                    {/* <h3>{product.category}</h3> */}
                    <h2>{product.description}</h2>
                    <h3>{product.summary}</h3>
                    {/* <div>{product.rating}</div> */}
                    <div>{product.investoryStatus}</div>
                    <div className="flex justify-content-between align-items-center mt-3">
                        <Tag value={`$${product.price}`} severity="info" className="font-bold" />
                        <Button label="Add To Basket" onClick={() => addFirst(product._id)} icon="pi pi-shopping-cart" severity="success" disabled={product.inventoryStatus === 'OUTOFSTOCK' || !isUserLoggedIn} />
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                        src={`http://localhost:1024/${product.image}`}
                        alt={product.name}
                        width="100%"
                        preview
                        className="hover-image"
                        style={{ width: '50rem' }}
                    />



                </div>
            </div>
        </Card>
    );
};

export default SingleProduct;



// //אופצייה עם גלרייה
//  "images":[
//   {
//     "itemImageSrc": "http://localhost:1024/box1.jpg",
//     "thumbnailImageSrc": "http://localhost:1024/box1.jpg",
//     "alt": "'מוצר מבט קדמי'"
//   },
//   {
//     "itemImageSrc": "http://localhost:1024/box2.jpg",
//     "thumbnailImageSrc": "http://localhost:1024/box2.jpg",
//     "alt": "'מוצר מבט צדדי'"
//   }
// ]
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Galleria } from 'primereact/galleria';
// // import { PhotoService } from './service/PhotoService';
// import { useSingleProductQuery } from './productsApiSlice';
// export default function BasicDemo1() {
//     const { id } = useParams()
//     const { data: product, isLoading, error, isSuccess } = useSingleProductQuery(id)
//     const [images, setImages] = useState([]);
//     const responsiveOptions = [
//         {
//             breakpoint: '991px',
//             numVisible: 4
//         },
//         {
//             breakpoint: '767px',
//             numVisible: 3
//         },
//         {
//             breakpoint: '575px',
//             numVisible: 1
//         }
//     ];
//     useEffect(() => {
//         if (product && product.images) {
//             setImages(product.images);
//         }
//         console.log("product:", product);

//     }, [isSuccess, product]);

//     const itemTemplate = (item) => {
//         return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
//     }

//     const thumbnailTemplate = (item) => {
//         return <img src={item.thumbnailImageSrc} style={{ width: '60px', height: '60px', objectFit: 'cover',margin:0 }}
//             alt={item.alt} />
//     }

//     return (
//         <div className="card">
//             <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }}
//                 item={itemTemplate} thumbnail={thumbnailTemplate} />
//         </div>
//     )
// }


