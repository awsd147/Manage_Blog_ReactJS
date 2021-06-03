import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { USER_ROUTES } from '../../constants/routes'
import { Link, withRouter } from 'react-router-dom'
import { Modal } from '@material-ui/core'
import '../../css/Modal.css'
class ManageFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            data1: {},
            page: 1,
            open: false,
            open1: false,
            food_name: '',
            carbs: '',
            fats: '',
            proteins: '',
            fiber: '',
            cholesterol: '',
        }
    }
    // componentDidMount = async () => {
    //     const confiq = await {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token'),
    //         }
    //     }
    //     let key = await `?&page=${this.state.page}&type=all&limit=6`
    //     await axios.get(USER_ROUTES.FOODS + key, confiq)
    //         .then(res => {
    //             const randomData = _.shuffle(res.data.data)
    //             this.setState({
    //                 data: randomData
    //             })
    //         })
    // }
    componentDidMount = async () => {
        const confiq = await {
            headers: {
                Authorization: 'token ' + localStorage.getItem('token'),
            }
        }
        let key = 'show?limit=100'
        await axios.get(USER_ROUTES.FOODS + key, confiq)
            .then(res => {
                const orderBy = _.orderBy(res.data.data, ['created_at'], ['desc'])
                this.setState({
                    data: orderBy
                })
            })
    }
    // onSelectPage = async (numberPage) => {
    //     await this.setState({
    //         page: numberPage
    //     })
    //     const confiq = await {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem('token'),
    //         }
    //     }
    //     let key = await `?&page=${this.state.page}&type=all&limit=6`
    //     await axios.get(USER_ROUTES.FOODS + key, confiq)
    //         .then(res => {
    //             const randomData = _.shuffle(res.data.data)
    //             this.setState({
    //                 data: randomData
    //             })
    //         })
    // }
    onNextPage = async () => {
        await this.setState({
            page: this.state.page + 1
        })
        const confiq = await {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        let key = await `?&page=${this.state.page}&type=all&limit=6`
        await axios.get(USER_ROUTES.FOODS + key, confiq)
            .then(res => {
                const randomData = _.shuffle(res.data.data)
                this.setState({
                    data: randomData
                })
            })
    }
    onPreviousPage = async () => {
        await this.setState({
            page: this.state.page - 1
        })
        const confiq = await {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        let key = await `?&page=${this.state.page}&type=all&limit=6`
        await axios.get(USER_ROUTES.FOODS + key, confiq)
            .then(res => {
                const randomData = _.shuffle(res.data.data)
                this.setState({
                    data: randomData
                })
            })
    }

    onInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onDelete = (e, id) => {
        e.preventDefault()
        const confiq = {
            headers: {
                Authorization: 'token ' + localStorage.getItem('token')
            }
        }
        axios.patch(USER_ROUTES.DELETEFOODS + id,{} ,confiq)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error.response)
            })
        console.log(USER_ROUTES.DELETEFOODS + id)
        console.log(confiq.headers.Authorization)
    }
    onCreateFood = (e) => {
        e.preventDefault()
        const confiq = {
            headers: {
                Authorization: 'token ' + localStorage.getItem('token')
            }
        }
        let data = {
            food_name: this.state.food_name,
            nutrions: {
                calories: this.state.calories,
                carbs: this.state.carbs,
                fats: this.state.fats,
                proteins: this.state.proteins,
                fiber: this.state.fiber,
                cholesterol: this.state.cholesterol,
            }
        }
        axios.post(USER_ROUTES.CREATEFOODS, data, confiq)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error.response)
            })

    }
    onRemoveFood = async () => {
        const confiq = {
            headers: {
                'Authorization': 'token ' + localStorage.getItem('token')
            }
        }
        let data = {
            food_name: this.state.food_name,
            nutrions: {
                calories: this.state.calories,
                carbs: this.state.carbs,
                fats: this.state.fats,
                proteins: this.state.proteins,
                fiber: this.state.fiber,
                cholesterol: this.state.cholesterol,
            }
        }
    }
    onDetailFood = async (id) => {
        axios.get(USER_ROUTES.FOODS + id)
            .then(res => {
                this.setState({
                    data1: res.data.data
                })
            })
    }
    onModal = () => {
        let data = this.state.data1
        if (data.nutrions) {
                return <Modal
                    open={this.state.open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <form onSubmit={() => this.onEditFood()}>
                        <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Product</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                            onClick={() => this.setState({
                                                open: false
                                            })}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>Food name : </p>
                                        <input name="food_name" type="text" onChange={(e) => this.onInput(e)} value={data.food_name} />
                                        <p>calories : </p>
                                        <input name="calories" type="text" onChange={(e) => this.onInput(e)} value={data.nutrions.calories} />
                                        <p>carbs : </p>
                                        <input name="carbs" type="text" onChange={(e) => this.onInput(e)} value={data.nutrions.carbs} />
                                        <p>fats : </p>
                                        <input name="fats" type="text" onChange={(e) => this.onInput(e)} value={data.nutrions.fats} />
                                        <p>proteins : </p>
                                        <input name="proteins" type="text" onChange={(e) => this.onInput(e)} value={data.nutrions.proteins} />
                                        <p>fiber : </p>
                                        <input name="fiber" type="text" onChange={(e) => this.onInput(e)} value={data.nutrions.fiber} />
                                        <p>cholesterol : </p>
                                        <input name="cholesterol" type="text" onChange={(e) => this.onInput(e)} value={data.nutrions.cholesterol} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-secondary" data-dismiss="modal">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
        }
    }
    renderFood() {
        let data = this.state.data
        if (data.length > 0) {
            return data.map((key, index) => {
                return (
                    <tr key={index}>
                        <td><input type="checkbox" /></td>
                        <td></td>
                        <td>{key.food_name}</td>
                        <td>{key.nutrions.calories}</td>
                        <td>{key.nutrions.carbs}</td>
                        <td>{key.nutrions.fats}</td>
                        <td>{key.nutrions.proteins}</td>
                        <td>{key.nutrions.fiber}</td>
                        <td>{key.nutrions.cholesterol}</td>
                        <td>
                            <div>
                                <i className="fas fa-edit btn btn-warning"
                                    onClick={() => {
                                        this.onDetailFood(key._id);
                                        this.setState({
                                            open: true
                                        })
                                    }} />
                                {this.onModal()}


                            </div>
                        </td>

                        <td onClick={(e) => this.onDelete(e, key._id)}><i className="bi bi-trash-fill btn btn-dark" /></td>
                    </tr>

                )
            })
        }
    }
    render() {
        return (
            <section id="shopping-cart " style={{ marginLeft: '213px', width: '88%' }}>
                <div className="row g-0" >
                    {/* g-0 == gutter = scrollX = 0  */}
                    <div className="col-12">
                        <div className="card border-0">
                            <div className="card-header border-0">
                                <h4 className="card-title">Manage Food</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body table-responsive">
                                    <ul className="table text-center m-0 d-inline">
                                        <li className=" d-inline mr-2 ">
                                            <button type="submit"
                                                className="btn btn-success col-2"
                                                onClick={() => this.setState({
                                                    open1: true
                                                })}>
                                                Add foods
                                            </button>
                                            <Modal
                                                open={this.state.open1}
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                            >
                                                <form onSubmit={(e) => this.onCreateFood(e)}>
                                                    <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                                                        <div className="modal-dialog" role="document">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title">Create food</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                                                        onClick={() => this.setState({
                                                                            open1: false
                                                                        })}>
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <p>Food name : </p>
                                                                    <input name="food_name" type="text" onChange={(e) => this.onInput(e)} />
                                                                    <p>calories : </p>
                                                                    <input name="calories" type="text" onChange={(e) => this.onInput(e)} />
                                                                    <p>carbs : </p>
                                                                    <input name="carbs" type="text" onChange={(e) => this.onInput(e)} />
                                                                    <p>fats : </p>
                                                                    <input name="fats" type="text" onChange={(e) => this.onInput(e)} />
                                                                    <p>proteins : </p>
                                                                    <input name="proteins" type="text" onChange={(e) => this.onInput(e)} />
                                                                    <p>fiber : </p>
                                                                    <input name="fiber" type="text" onChange={(e) => this.onInput(e)} />
                                                                    <p>cholesterol : </p>
                                                                    <input name="cholesterol" type="text" onChange={(e) => this.onInput(e)} />
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="submit" className="btn btn-secondary" data-dismiss="modal">Create</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                            </Modal>

                                        </li>
                                        <li className=" d-inline mr-2 ">
                                            <button type="submit"
                                                className="btn btn-danger col-2" onClick={() => this.onRemoveFood()}>
                                                Remove foods
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card border-0">
                            <div className="card-content">
                                <div className="card-body table-responsive">
                                    <table className="table text-center m-0">
                                        <thead className="border-0">
                                            <tr className="border-top-0">
                                                <th className="border-top-0" ></th>
                                                <th className="border-top-0">Image</th>
                                                <th className="border-top-0">Product</th>
                                                <th className="border-top-0">Calories</th>
                                                <th className="border-top-0">Carbs</th>
                                                <th className="border-top-0">Fats</th>
                                                <th className="border-top-0">Proteins</th>
                                                <th className="border-top-0">Fiber</th>
                                                <th className="border-top-0">Cholesterol</th>
                                                <th className="border-top-0">Edit</th>
                                                <th className="border-top-0">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {this.renderFood()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <ul className="pagination justify-content-start col-6">
                            <li className={this.state.page > 1 ? 'page-item col-2 ml-4 text-center' : 'page-item col-2 disabled ml-4 text-center'}>
                                <Link to={`/admin/food/page${this.state.page - 1}`} className="page-link" onClick={() => this.onPreviousPage()}>Previous</Link>
                            </li>
                        </ul>
                        <ul className="pagination justify-content-end col-6">
                            <li className="page-item col-2 text-center">
                                <Link to={`/admin/food/page${this.state.page + 1}`} className="page-link text-center" onClick={() => this.onNextPage()}>Next</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section >

        )
    }
}
export default withRouter(ManageFood)