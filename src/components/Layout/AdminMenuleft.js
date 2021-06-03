import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../css/Layout.css'
class AdminMenuleft extends Component {
    constructor(props) {
        super(props)
        this.state = {
            up: false,
            isActive : 1
        }
    }

    onUpChervon = () => {
        this.setState({
            up: !this.state.up
        })
    }
    render() {
        return (
            <>
                <div className="offcanvas offcanvas-start bg-secondary text-white visible" style={{ width: '220px', top: '96px', left: '220px' }} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-body p-0">
                        <nav className="navbar-dark">
                            <ul className="navbar-nav">
                                <li className="mt-5 ">
                                    <a className={`nav-link px-3 ${this.state.isActive == 1 ? 'active' : ''}`} href="#" alt="#" onClick={() => this.setState({
                                        isActive : 1
                                    })}>
                                        <span className="me-2">
                                            <i class="bi bi-speedometer2"></i>
                                        </span>
                                        <span className="btn-lg ml-2 ">Dashboard</span>
                                    </a>
                                </li>
                                <li className="my-4">
                                    <hr className="dropdown-divider" />
                                </li>

                                <li className="mt-3">
                                    <Link to='/admin/user' className={`nav-link px-3 slidebar-link ${this.state.isActive == 2 ? 'active' : ''}`}
                                        data-toggle="collapse"
                                        href="#collapseExample"
                                        role="button" aria-expanded="false"
                                        aria-controls="collapseExample"
                                        onClick={() => this.setState({
                                            isActive : 2
                                        })}
                                        >
                                        <span className="me-2"><i className="fas fa-users" /></span>
                                        <span className="btn-lg">Manage user</span>

                                    </Link>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card card-body">
                                            Thu Hạ
                                        </div>
                                    </div>
                                    <li className="my-4">
                                        <hr className="dropdown-divider" />
                                    </li>
                                </li>
                                <li className="mt-3">
                                    <Link to='/admin/food' className={`nav-link px-3 slidebar-link ${this.state.isActive == 3 ? 'active' : ''}`}
                                        data-toggle="collapse"
                                        href="#collapseExample"
                                        role="button" aria-expanded="false"
                                        aria-controls="collapseExample"
                                        onClick={() => this.setState({
                                            isActive : 3
                                        })}
                                        >
                                        <span className="me-2"><i className="fas fa-utensils" /></span>
                                        <span className="btn-lg ml-2 ">Manage food</span>

                                    </Link>
                                    <div className="collapse" id="collapseExample">
                                        <div className="card card-body">
                                            Thu Hạ
                                        </div>
                                    </div>
                                    <li className="my-4">
                                        <hr className="dropdown-divider" />
                                    </li>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>

            </>

        )
    }
}

export default AdminMenuleft
{/* <span className="col-7"
                                            style={{ display: 'inline-flex' }}>
                                            <i class={`bi bi-chevron-${this.state.up !== false ? 'up' : 'down'} ml-auto`} onClick={() => this.onUpChervon()} />
                                        </span> */}