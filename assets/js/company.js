// Menu configuration with file paths
const menuConfig = {
    overview: {
        title: 'Tổng quan',
        submenu: null,
        defaultContent: 'overview',
        files: {
            html: '../../pages/company/overview/index.html',
            css: '../../pages/company/overview/style.css',
            js: '../../pages/company/overview/main.js'
        }
    },
    traceability: {
        title: 'Truy xuất',
        submenu: [
            { 
                id: 'products', 
                name: 'Sản phẩm', 
                icon: 'fas fa-boxes',
                files: {
                    html: '../../pages/company/traceability/products/list/index.html',
                    css: '../../pages/company/traceability/products/list/style.css',
                    js: '../../pages/company/traceability/products/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-product', 
                        name: 'Thêm sản phẩm', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/products/add/index.html',
                            css: '../../pages/company/traceability/products/add/style.css',
                            js: '../../pages/company/traceability/products/add/main.js'
                        }
                    },
                    { 
                        id: 'view-product', 
                        name: 'Xem chi tiết sản phẩm', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/products/view/index.html',
                            css: '../../pages/company/traceability/products/view/style.css',
                            js: '../../pages/company/traceability/products/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-product', 
                        name: 'Sửa sản phẩm', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/products/edit/index.html',
                            css: '../../pages/company/traceability/products/edit/style.css',
                            js: '../../pages/company/traceability/products/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'products'
            },
            { 
                id: 'stamp-template', 
                name: 'Mẫu tem', 
                icon: 'fas fa-stamp',
                files: {
                    html: '../../pages/company/traceability/stamp-template/list/index.html',
                    css: '../../pages/company/traceability/stamp-template/list/style.css',
                    js: '../../pages/company/traceability/stamp-template/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-stamp-template', 
                        name: 'Thêm mẫu tem', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/stamp-template/add/index.html',
                            css: '../../pages/company/traceability/stamp-template/add/style.css',
                            js: '../../pages/company/traceability/stamp-template/add/main.js'
                        }
                    },
                    { 
                        id: 'view-stamp-template', 
                        name: 'Xem chi tiết mẫu tem', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/stamp-template/view/index.html',
                            css: '../../pages/company/traceability/stamp-template/view/style.css',
                            js: '../../pages/company/traceability/stamp-template/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-stamp-template', 
                        name: 'Sửa mẫu tem', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/stamp-template/edit/index.html',
                            css: '../../pages/company/traceability/stamp-template/edit/style.css',
                            js: '../../pages/company/traceability/stamp-template/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'stamp-template'
            },
            { 
                id: 'print-stamp', 
                name: 'In tem', 
                icon: 'fas fa-print',
                files: {
                    html: '../../pages/company/traceability/print-stamp/list/index.html',
                    css: '../../pages/company/traceability/print-stamp/list/style.css',
                    js: '../../pages/company/traceability/print-stamp/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-print-stamp', 
                        name: 'Thêm in tem', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/print-stamp/add/index.html',
                            css: '../../pages/company/traceability/print-stamp/add/style.css',
                            js: '../../pages/company/traceability/print-stamp/add/main.js'
                        }
                    },
                    { 
                        id: 'view-print-stamp', 
                        name: 'Xem chi tiết in tem', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/print-stamp/view/index.html',
                            css: '../../pages/company/traceability/print-stamp/view/style.css',
                            js: '../../pages/company/traceability/print-stamp/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-print-stamp', 
                        name: 'Sửa in tem', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/print-stamp/edit/index.html',
                            css: '../../pages/company/traceability/print-stamp/edit/style.css',
                            js: '../../pages/company/traceability/print-stamp/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'print-stamp'
            },
            { 
                id: 'activate', 
                name: 'Kích hoạt', 
                icon: 'fas fa-check-circle',
                files: {
                    html: '../../pages/company/traceability/activate/list/index.html',
                    css: '../../pages/company/traceability/activate/list/style.css',
                    js: '../../pages/company/traceability/activate/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-activate', 
                        name: 'Thêm kích hoạt', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/activate/add/index.html',
                            css: '../../pages/company/traceability/activate/add/style.css',
                            js: '../../pages/company/traceability/activate/add/main.js'
                        }
                    },
                    { 
                        id: 'view-activate', 
                        name: 'Xem chi tiết kích hoạt', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/activate/view/index.html',
                            css: '../../pages/company/traceability/activate/view/style.css',
                            js: '../../pages/company/traceability/activate/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-activate', 
                        name: 'Sửa kích hoạt', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/activate/edit/index.html',
                            css: '../../pages/company/traceability/activate/edit/style.css',
                            js: '../../pages/company/traceability/activate/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'activate'
            },
            { 
                id: 'sell', 
                name: 'Bán', 
                icon: 'fas fa-shopping-cart',
                files: {
                    html: '../../pages/company/traceability/sell/list/index.html',
                    css: '../../pages/company/traceability/sell/list/style.css',
                    js: '../../pages/company/traceability/sell/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-sell', 
                        name: 'Thêm bán', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/sell/add/index.html',
                            css: '../../pages/company/traceability/sell/add/style.css',
                            js: '../../pages/company/traceability/sell/add/main.js'
                        }
                    },
                    { 
                        id: 'view-sell', 
                        name: 'Xem chi tiết bán', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/sell/view/index.html',
                            css: '../../pages/company/traceability/sell/view/style.css',
                            js: '../../pages/company/traceability/sell/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-sell', 
                        name: 'Sửa bán', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/sell/edit/index.html',
                            css: '../../pages/company/traceability/sell/edit/style.css',
                            js: '../../pages/company/traceability/sell/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'sell'
            },
            { 
                id: 'cancel', 
                name: 'Hủy', 
                icon: 'fas fa-ban',
                files: {
                    html: '../../pages/company/traceability/cancel/list/index.html',
                    css: '../../pages/company/traceability/cancel/list/style.css',
                    js: '../../pages/company/traceability/cancel/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-cancel', 
                        name: 'Thêm hủy', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/cancel/add/index.html',
                            css: '../../pages/company/traceability/cancel/add/style.css',
                            js: '../../pages/company/traceability/cancel/add/main.js'
                        }
                    },
                    { 
                        id: 'view-cancel', 
                        name: 'Xem chi tiết hủy', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/cancel/view/index.html',
                            css: '../../pages/company/traceability/cancel/view/style.css',
                            js: '../../pages/company/traceability/cancel/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-cancel', 
                        name: 'Sửa hủy', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/cancel/edit/index.html',
                            css: '../../pages/company/traceability/cancel/edit/style.css',
                            js: '../../pages/company/traceability/cancel/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'cancel'
            },
            { 
                id: 'lookup', 
                name: 'Tra cứu', 
                icon: 'fas fa-search',
                files: {
                    html: '../../pages/company/traceability/lookup/list/index.html',
                    css: '../../pages/company/traceability/lookup/list/style.css',
                    js: '../../pages/company/traceability/lookup/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-lookup', 
                        name: 'Thêm tra cứu', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/traceability/lookup/add/index.html',
                            css: '../../pages/company/traceability/lookup/add/style.css',
                            js: '../../pages/company/traceability/lookup/add/main.js'
                        }
                    },
                    { 
                        id: 'view-lookup', 
                        name: 'Xem chi tiết tra cứu', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/traceability/lookup/view/index.html',
                            css: '../../pages/company/traceability/lookup/view/style.css',
                            js: '../../pages/company/traceability/lookup/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-lookup', 
                        name: 'Sửa tra cứu', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/traceability/lookup/edit/index.html',
                            css: '../../pages/company/traceability/lookup/edit/style.css',
                            js: '../../pages/company/traceability/lookup/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'lookup'
            }
        ],
        defaultContent: 'products'
    },
    services: {
        title: 'Dịch vụ',
        submenu: [
            { 
                id: 'current-services', 
                name: 'Dịch vụ hiện tại', 
                icon: 'fas fa-box',
                files: {
                    html: '../../pages/company/services/current-services/list/index.html',
                    css: '../../pages/company/services/current-services/list/style.css',
                    js: '../../pages/company/services/current-services/list/main.js'
                },
                submenu: [
                    { 
                        id: 'view-current-service', 
                        name: 'Xem chi tiết dịch vụ hiện tại', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/services/current-services/view/index.html',
                            css: '../../pages/company/services/current-services/view/style.css',
                            js: '../../pages/company/services/current-services/view/main.js'
                        }
                    }
                ],
                defaultContent: 'current-services'
            },
            { 
                id: 'system-services', 
                name: 'Dịch vụ hệ thống', 
                icon: 'fas fa-cogs',
                files: {
                    html: '../../pages/company/services/system-services/list/index.html',
                    css: '../../pages/company/services/system-services/list/style.css',
                    js: '../../pages/company/services/system-services/list/main.js'
                },
                submenu: [
                    { 
                        id: 'view-system-service', 
                        name: 'Xem chi tiết dịch vụ hệ thống', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/services/system-services/view/index.html',
                            css: '../../pages/company/services/system-services/view/style.css',
                            js: '../../pages/company/services/system-services/view/main.js'
                        }
                    }
                ],
                defaultContent: 'system-services'
            },
            { 
                id: 'orders-payments', 
                name: 'Đơn hàng/ Thanh toán', 
                icon: 'fas fa-credit-card',
                files: {
                    html: '../../pages/company/services/orders-payments/list/index.html',
                    css: '../../pages/company/services/orders-payments/list/style.css',
                    js: '../../pages/company/services/orders-payments/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-order-payment', 
                        name: 'Thêm đơn hàng/ thanh toán', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/services/orders-payments/add/index.html',
                            css: '../../pages/company/services/orders-payments/add/style.css',
                            js: '../../pages/company/services/orders-payments/add/main.js'
                        }
                    },
                    { 
                        id: 'view-order-payment', 
                        name: 'Xem chi tiết đơn hàng/ thanh toán', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/services/orders-payments/view/index.html',
                            css: '../../pages/company/services/orders-payments/view/style.css',
                            js: '../../pages/company/services/orders-payments/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-order-payment', 
                        name: 'Sửa đơn hàng/ thanh toán', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/services/orders-payments/edit/index.html',
                            css: '../../pages/company/services/orders-payments/edit/style.css',
                            js: '../../pages/company/services/orders-payments/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'orders-payments'
            }
        ],
        defaultContent: 'current-services'
    },
    logs: {
        title: 'Nhật ký',
        submenu: [
            { 
                id: 'logs', 
                name: 'Nhật ký', 
                icon: 'fas fa-book',
                files: {
                    html: '../../pages/company/logs/logs/list/index.html',
                    css: '../../pages/company/logs/logs/list/style.css',
                    js: '../../pages/company/logs/logs/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-log', 
                        name: 'Thêm nhật ký', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/logs/logs/add/index.html',
                            css: '../../pages/company/logs/logs/add/style.css',
                            js: '../../pages/company/logs/logs/add/main.js'
                        }
                    },
                    { 
                        id: 'view-log', 
                        name: 'Xem chi tiết nhật ký', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/logs/logs/view/index.html',
                            css: '../../pages/company/logs/logs/view/style.css',
                            js: '../../pages/company/logs/logs/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-log', 
                        name: 'Sửa nhật ký', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/logs/logs/edit/index.html',
                            css: '../../pages/company/logs/logs/edit/style.css',
                            js: '../../pages/company/logs/logs/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'logs'
            },
            { 
                id: 'planting-areas', 
                name: 'Vùng trồng', 
                icon: 'fas fa-leaf',
                files: {
                    html: '../../pages/company/logs/planting-areas/list/index.html',
                    css: '../../pages/company/logs/planting-areas/list/style.css',
                    js: '../../pages/company/logs/planting-areas/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-planting-area', 
                        name: 'Thêm vùng trồng', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/logs/planting-areas/add/index.html',
                            css: '../../pages/company/logs/planting-areas/add/style.css',
                            js: '../../pages/company/logs/planting-areas/add/main.js'
                        }
                    },
                    { 
                        id: 'view-planting-area', 
                        name: 'Xem chi tiết vùng trồng', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/logs/planting-areas/view/index.html',
                            css: '../../pages/company/logs/planting-areas/view/style.css',
                            js: '../../pages/company/logs/planting-areas/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-planting-area', 
                        name: 'Sửa vùng trồng', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/logs/planting-areas/edit/index.html',
                            css: '../../pages/company/logs/planting-areas/edit/style.css',
                            js: '../../pages/company/logs/planting-areas/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'planting-areas'
            },
            { 
                id: 'processes', 
                name: 'Quy trình', 
                icon: 'fas fa-cogs',
                files: {
                    html: '../../pages/company/logs/processes/list/index.html',
                    css: '../../pages/company/logs/processes/list/style.css',
                    js: '../../pages/company/logs/processes/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-process', 
                        name: 'Thêm quy trình', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/logs/processes/add/index.html',
                            css: '../../pages/company/logs/processes/add/style.css',
                            js: '../../pages/company/logs/processes/add/main.js'
                        }
                    },
                    { 
                        id: 'view-process', 
                        name: 'Xem chi tiết quy trình', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/logs/processes/view/index.html',
                            css: '../../pages/company/logs/processes/view/style.css',
                            js: '../../pages/company/logs/processes/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-process', 
                        name: 'Sửa quy trình', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/logs/processes/edit/index.html',
                            css: '../../pages/company/logs/processes/edit/style.css',
                            js: '../../pages/company/logs/processes/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'processes'
            }
        ],
        defaultContent: 'logs'
    },
    admin: {
        title: 'Quản trị',
        submenu: [
            { 
                id: 'entities', 
                name: 'Chủ thể', 
                icon: 'fas fa-building',
                files: {
                    html: '../../pages/company/admin/entities/list/index.html',
                    css: '../../pages/company/admin/entities/list/style.css',
                    js: '../../pages/company/admin/entities/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-entity', 
                        name: 'Thêm chủ thể', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/admin/entities/add/index.html',
                            css: '../../pages/company/admin/entities/add/style.css',
                            js: '../../pages/company/admin/entities/add/main.js'
                        }
                    },
                    { 
                        id: 'view-entity', 
                        name: 'Xem chi tiết chủ thể', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/admin/entities/view/index.html',
                            css: '../../pages/company/admin/entities/view/style.css',
                            js: '../../pages/company/admin/entities/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-entity', 
                        name: 'Sửa chủ thể', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/admin/entities/edit/index.html',
                            css: '../../pages/company/admin/entities/edit/style.css',
                            js: '../../pages/company/admin/entities/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'entities'
            },
            { 
                id: 'sales-points', 
                name: 'Điểm bán', 
                icon: 'fas fa-store',
                files: {
                    html: '../../pages/company/admin/sales-points/list/index.html',
                    css: '../../pages/company/admin/sales-points/list/style.css',
                    js: '../../pages/company/admin/sales-points/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-sales-point', 
                        name: 'Thêm điểm bán', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/admin/sales-points/add/index.html',
                            css: '../../pages/company/admin/sales-points/add/style.css',
                            js: '../../pages/company/admin/sales-points/add/main.js'
                        }
                    },
                    { 
                        id: 'view-sales-point', 
                        name: 'Xem chi tiết điểm bán', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/admin/sales-points/view/index.html',
                            css: '../../pages/company/admin/sales-points/view/style.css',
                            js: '../../pages/company/admin/sales-points/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-sales-point', 
                        name: 'Sửa điểm bán', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/admin/sales-points/edit/index.html',
                            css: '../../pages/company/admin/sales-points/edit/style.css',
                            js: '../../pages/company/admin/sales-points/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'sales-points'
            },
            { 
                id: 'partners', 
                name: 'Đối tác', 
                icon: 'fas fa-handshake',
                files: {
                    html: '../../pages/company/admin/partners/list/index.html',
                    css: '../../pages/company/admin/partners/list/style.css',
                    js: '../../pages/company/admin/partners/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-partner', 
                        name: 'Thêm đối tác', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/admin/partners/add/index.html',
                            css: '../../pages/company/admin/partners/add/style.css',
                            js: '../../pages/company/admin/partners/add/main.js'
                        }
                    },
                    { 
                        id: 'view-partner', 
                        name: 'Xem chi tiết đối tác', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/admin/partners/view/index.html',
                            css: '../../pages/company/admin/partners/view/style.css',
                            js: '../../pages/company/admin/partners/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-partner', 
                        name: 'Sửa đối tác', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/admin/partners/edit/index.html',
                            css: '../../pages/company/admin/partners/edit/style.css',
                            js: '../../pages/company/admin/partners/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'partners'
            },
            { 
                id: 'invite-users', 
                name: 'Mời người dùng', 
                icon: 'fas fa-user-plus',
                files: {
                    html: '../../pages/company/admin/invite-users/list/index.html',
                    css: '../../pages/company/admin/invite-users/list/style.css',
                    js: '../../pages/company/admin/invite-users/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-invite-user', 
                        name: 'Thêm mời người dùng', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/admin/invite-users/add/index.html',
                            css: '../../pages/company/admin/invite-users/add/style.css',
                            js: '../../pages/company/admin/invite-users/add/main.js'
                        }
                    },
                    { 
                        id: 'view-invite-user', 
                        name: 'Xem chi tiết mời người dùng', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/admin/invite-users/view/index.html',
                            css: '../../pages/company/admin/invite-users/view/style.css',
                            js: '../../pages/company/admin/invite-users/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-invite-user', 
                        name: 'Sửa mời người dùng', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/admin/invite-users/edit/index.html',
                            css: '../../pages/company/admin/invite-users/edit/style.css',
                            js: '../../pages/company/admin/invite-users/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'invite-users'
            },
            { 
                id: 'personnel', 
                name: 'Nhân sự', 
                icon: 'fas fa-user-tie',
                files: {
                    html: '../../pages/company/admin/personnel/list/index.html',
                    css: '../../pages/company/admin/personnel/list/style.css',
                    js: '../../pages/company/admin/personnel/list/main.js'
                },
                submenu: [
                    { 
                        id: 'add-personnel', 
                        name: 'Thêm nhân sự', 
                        icon: 'fas fa-plus',
                        files: {
                            html: '../../pages/company/admin/personnel/add/index.html',
                            css: '../../pages/company/admin/personnel/add/style.css',
                            js: '../../pages/company/admin/personnel/add/main.js'
                        }
                    },
                    { 
                        id: 'view-personnel', 
                        name: 'Xem chi tiết nhân sự', 
                        icon: 'fas fa-eye',
                        files: {
                            html: '../../pages/company/admin/personnel/view/index.html',
                            css: '../../pages/company/admin/personnel/view/style.css',
                            js: '../../pages/company/admin/personnel/view/main.js'
                        }
                    },
                    { 
                        id: 'edit-personnel', 
                        name: 'Sửa nhân sự', 
                        icon: 'fas fa-edit',
                        files: {
                            html: '../../pages/company/admin/personnel/edit/index.html',
                            css: '../../pages/company/admin/personnel/edit/style.css',
                            js: '../../pages/company/admin/personnel/edit/main.js'
                        }
                    }
                ],
                defaultContent: 'personnel'
            }
        ],
        defaultContent: 'entities'
    }
};

// Current state
let currentMainMenu = 'overview';
let currentSubMenu = null;
let loadedStyles = new Set(); // Track loaded CSS files
let loadedScripts = new Set(); // Track loaded JS files

// DOM Elements
const desktopSidebarContent = document.getElementById('desktopSidebarContent');
const contentArea = document.getElementById('contentArea');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load default content
    switchMainMenu(document.querySelector('[data-menu="overview"]'), 'overview');
});

// Switch main menu
function switchMainMenu(element, menuKey) {
    // Update active state for main menu
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    element.classList.add('active');
    
    currentMainMenu = menuKey;
    const menuData = menuConfig[menuKey];
    
    // Update sidebar
    updateSidebar(menuData);
    
    // Load default content for this menu
    loadContent(menuData.defaultContent);
}

// Update sidebar based on current menu
function updateSidebar(menuData) {
    if (!menuData.submenu) {
        // No submenu (like overview)
        desktopSidebarContent.innerHTML = '';
        return;
    }
    
    // Create submenu HTML
    const submenuHTML = `
        <nav class="sidebar-nav">
            <ul class="sidebar-menu nav flex-column">
                ${menuData.submenu.map(item => `
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-content="${item.id}" onclick="loadContent('${item.id}')">
                            <i class="${item.icon}"></i>
                            ${item.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </nav>
    `;
    
    desktopSidebarContent.innerHTML = submenuHTML;
    
    // Set first item as active
    const firstLink = desktopSidebarContent.querySelector('.nav-link');
    if (firstLink) {
        firstLink.classList.add('active');
        currentSubMenu = firstLink.getAttribute('data-content');
    }
}

// Load content dynamically from external files
async function loadContent(contentId) {
    try {
        // Show loading spinner
        showLoading(true);
        
        // Update active state in sidebar
        updateSidebarActive(contentId);
        
        // Update mobile nav active state
        updateMobileNavActive(contentId);
        
        // Get file paths for the content
        const filePaths = getFilePaths(contentId);
        
        if (!filePaths) {
            throw new Error(`No file configuration found for content: ${contentId}`);
        }
        
        // Load HTML content
        let htmlContent = '';
        if (filePaths.html) {
            try {
                const htmlResponse = await fetch(filePaths.html);
                if (htmlResponse.ok) {
                    htmlContent = await htmlResponse.text();
                } else {
                    throw new Error(`HTML file not found: ${filePaths.html}`);
                }
            } catch (error) {
                console.warn(`Error loading HTML file: ${filePaths.html}`, error);
                throw error;
            }
        } else {
            throw new Error(`No HTML file path configured for content: ${contentId}`);
        }
        
        // Load CSS file
        if (filePaths.css && !loadedStyles.has(filePaths.css)) {
            try {
                await loadCSS(filePaths.css);
                loadedStyles.add(filePaths.css);
            } catch (error) {
                console.warn(`Error loading CSS file: ${filePaths.css}`, error);
            }
        }
        
        // Update content area
        contentArea.innerHTML = htmlContent;
        contentArea.classList.add('fade-in');
        
        // Load and execute JS file
        if (filePaths.js && !loadedScripts.has(filePaths.js)) {
            try {
                await loadJS(filePaths.js);
                loadedScripts.add(filePaths.js);
            } catch (error) {
                console.warn(`Error loading JS file: ${filePaths.js}`, error);
            }
        }
        
        // Hide loading spinner
        showLoading(false);
        
        currentSubMenu = contentId;
        
        // Trigger custom event for content loaded
        document.dispatchEvent(new CustomEvent('contentLoaded', { 
            detail: { contentId, filePaths } 
        }));
        
    } catch (error) {
        console.error('Error loading content:', error);
        contentArea.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Có lỗi xảy ra khi tải nội dung "${contentId}". Vui lòng thử lại.
                <br><small class="text-muted">Chi tiết lỗi: ${error.message}</small>
            </div>
        `;
        showLoading(false);
    }
}

// Get file paths for a content ID
function getFilePaths(contentId) {
    // Check if it's a main menu item
    for (const [menuKey, menuData] of Object.entries(menuConfig)) {
        if (menuData.defaultContent === contentId && menuData.files) {
            return menuData.files;
        }
        
        // Check submenu items
        if (menuData.submenu) {
            const submenuItem = menuData.submenu.find(item => item.id === contentId);
            if (submenuItem && submenuItem.files) {
                return submenuItem.files;
            }
            // Check nested submenu
            if (menuData.submenu.some(item => item.submenu)) {
                for (const subItem of menuData.submenu) {
                    if (subItem.submenu) {
                        const nestedItem = subItem.submenu.find(nested => nested.id === contentId);
                        if (nestedItem && nestedItem.files) {
                            return nestedItem.files;
                        }
                    }
                }
            }
        }
    }
    
    return null;
}

// Load CSS file dynamically
function loadCSS(cssPath) {
    return new Promise((resolve, reject) => {
        // Check if CSS is already loaded
        const existingLink = document.querySelector(`link[href="${cssPath}"]`);
        if (existingLink) {
            resolve();
            return;
        }
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssPath;
        
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load CSS: ${cssPath}`));
        
        document.head.appendChild(link);
    });
}

// Load JS file dynamically
function loadJS(jsPath) {
    return new Promise((resolve, reject) => {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${jsPath}"]`);
        if (existingScript) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = jsPath;
        
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load JS: ${jsPath}`));
        
        document.body.appendChild(script);
    });
}

// Update sidebar active state
function updateSidebarActive(contentId) {
    const sidebarLinks = desktopSidebarContent.querySelectorAll('.nav-link');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('data-content') === contentId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Update mobile nav active state
function updateMobileNavActive(contentId) {
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');
    mobileLinks.forEach(link => {
        if (link.getAttribute('onclick')?.includes(contentId)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Show/hide loading spinner
function showLoading(show) {
    if (show) {
        loadingSpinner.classList.remove('d-none');
        contentArea.style.opacity = '0.5';
    } else {
        loadingSpinner.classList.add('d-none');
        contentArea.style.opacity = '1';
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 90px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Clean up loaded resources when needed
function cleanupResources() {
    // Remove dynamically loaded CSS files
    loadedStyles.forEach(cssPath => {
        const link = document.querySelector(`link[href="${cssPath}"]`);
        if (link) {
            link.remove();
        }
    });
    loadedStyles.clear();
    
    // Note: JS files are not removed as they may contain needed functions
    // If you need to remove JS files, you can implement similar logic
}

// Handle responsive menu changes
window.addEventListener('resize', function() {
    // Close mobile menu when switching to desktop
    if (window.innerWidth >= 992) {
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileSidebar'));
        if (offcanvas) {
            offcanvas.hide();
        }
    }
});

// Export functions for external use
window.companyLayout = {
    loadContent,
    showNotification,
    cleanupResources,
    getFilePaths
};