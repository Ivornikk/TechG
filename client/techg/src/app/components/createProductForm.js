'use client'

import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../store/StoreProvider"
import { observer } from "mobx-react-lite"
import { createProduct, fetchGroups } from "../http/ProductAPI"

const CreateProuctForm = observer(({onHide}) => {

    const {product} = useContext(StoreContext)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0.00)
    const [description, setDescription] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [descriptionImages, setDescriptionImages] = useState([])
    const [groupId, setGroupId] = useState(0)

    useEffect(() => {
        fetchGroups()
        .then(data => {
            product.setGroups(data.rows)
            setGroupId(data.rows[0].id)
        })
    }, [])

    const addProduct = () => {
        createProduct({
            title: title,
            description: description,
            price: Number(price),
            preview_image: previewImage,
            description_images: descriptionImages,
            groupId: groupId
        })
        .then(() => {
            fetchGroups()
            .then(data => {
                product.setGroups(data.rows)
            })
        })
    }

    return (
        <div className="mx-15 flex flex-col justify-center my-10">
            <form className="grid grid-cols-2 gap-10 mb-5">
                <div className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Product name"
                        onChange={e => setTitle(e.target.value)}
                        className="px-2 py-2 border border-brand rounded" />
                    <input
                        type="text"
                        placeholder="Product price"
                        onChange={e => setPrice(e.target.value)}
                        className="px-2 py-2 border border-brand rounded" />
                    <input
                        type="textbox"
                        placeholder="Product description"
                        onChange={e => setDescription(e.target.value)} 
                        className="px-2 py-2 border border-brand rounded" />
                        <label className="text-gray-text">
                            Choose group for product:
                        </label>
                    <select
                        className="px-1 py-1 border border-brand rounded">
                        {
                            product.groups.map(group => {
                                return (
                                    <option key={group.id}
                                        onClick={() => setGroupId(group.id)}>
                                        {group.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-5">
                    <input type="file"
                        placeholder="Choose preview image"
                        onChange={e => setPreviewImage(e.target.files[0])}
                        className="px-1 py-1 border border-brand rounded"></input>
                    <input type="file"
                        placeholder="Choose carousel images"
                        onChange={e => setDescriptionImages(e.target.files)}
                        className="px-1 py-1 border border-brand rounded"></input>
                </div>
            </form>
            <div className="flex justify-end gap-5">
                <button className="px-5 py-3 bg-brand text-white border border-brand cursor-pointer rounded-xl hover:bg-white hover:text-brand transition flex-none"
                    onClick={onHide}>
                    Cancel
                </button>
                <button  className="px-5 py-3 bg-brand text-white border border-brand cursor-pointer rounded-xl hover:bg-white hover:text-brand transition flex-none"
                    onClick={() => addProduct()}>
                    Create
                </button>
            </div>
        </div>
    )
})

export default CreateProuctForm