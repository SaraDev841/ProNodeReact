import { useAddFirstMutation } from '../basket/BasketApiSlice'
import { useGetProductsQuery } from './productsApiSlice'
import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import "./Product.css"


export default function BasicDemo() {
    const [layout, setLayout] = useState('grid');
    const { data: products, isLoading, isError, error, refetch } = useGetProductsQuery();
    const [addFirst, { isSuccess: addSuccess, isError: addIsError, error: addError }] = useAddFirstMutation()
    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const toast = useRef(null);
    useEffect(() => {
        if (addIsError) {
            toast.current.show({
                severity: 'info', summary: 'Message',
                detail: addError.data.message, life: 3000
            })
        } else if (addSuccess) {
            toast.current.show({
                severity: 'success', summary: 'Success',
                detail: "המוצר נוסף לסל בהצלחה", life: 3000
            })
        }
    }, [addSuccess, addIsError])

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (product, index) => {
        return (<>
            <Toast ref={toast} />
            <div className="col-12" key={product.id}>
            <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                <img onClick={() => navigate(`/product/${product._id}`)} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1024/${product.image}`} alt={product.name} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{product.name}</div>
                        <div className="text-2xl font-bold text-900">{product.description}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.category}</span>
                            </span>
                            <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button icon="pi pi-shopping-cart" onClick={() => addFirst(product._id)} className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK' || !isUserLoggedIn}></Button>
                    </div>
                </div>
            </div>
        </div >
        </>);
};

const gridItem = (product) => {
    return (<>
        <Toast ref={toast} />
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
            <div className="card-holographic" onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
            }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}>
                <div
                    className="card-inner holographic"
                    style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                    }}

                >


                    <div className="flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag category-icon holographic"></i>
                            <span className="category-text holographic">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>

                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img onClick={() => navigate(`/product/${product._id}`)} className="w-9 shadow-2 border-round" src={`http://localhost:1024/${product.image}`} alt={product.name} />
                        <div className="product-title holographic">{product.name}</div>
                        <div className="text-2xl font-bold text-900 centered-description">{product.description}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>

                    <div className="flex align-items-center justify-content-between">
                        <span className="product-price holographic">${product.price}</span>
                        {/* כפתור עגלה,הוסף לסל */}
                        <Button icon="pi pi-shopping-cart" onClick={() => addFirst(product._id)} className="cart-button holographic" disabled={product.inventoryStatus === 'OUTOFSTOCK' || !isUserLoggedIn}></Button>

                    </div>
                </div>
            </div>
        </div>
    </>);
};

const itemTemplate = (product, layout, index) => {
    if (!product) {
        return;
    }

    if (layout === 'list') return listItem(product, index);
    else if (layout === 'grid') return gridItem(product);
};

const listTemplate = (products, layout) => {
    return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
};

const header = () => {
    return (
        <div className="flex justify-content-end">
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );
};

return (
    <div className="products-container glassmorphism">
        <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
    </div>
)
}

