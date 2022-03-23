import LoginPage from "views/pages/LoginPage";
import ForgotPasswordPage from "views/pages/ForgotPasswordPage";
import ResetPasswordPage from "views/pages/ResetPasswordPage";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import AccountManage from "views/pages/AccountManage";
import RoleManage from "views/pages/RoleManage";
import ProducerManage from "views/pages/ProducerManage";
import ProductGroups from "views/pages/CategorySettings/ProductGroups";
import ProductTypes from "views/pages/CategorySettings/ProductTypes";
import ProductUnits from "views/pages/CategorySettings/ProductUnits";
import DetailedDefinition from "views/pages/CategroryDefinition/DetailedDefinition";
import ProductDefinition from "views/pages/CategroryDefinition/ProductDefinition";
import PackageDefinition from "views/pages/CategroryDefinition/PackageDefinition";
import BlockDefinition from "views/pages/CategroryDefinition/BlockDefinition";
import CommandProductionInOut from "views/pages/ProductionInfoManagement/CommandProductionInOut";
import CommandProductionInOutOrder from "views/pages/ProductionInfoManagement/CommandProductionInOutOrder";
import CompanyDefinition from "views/pages/ProductionInfoManagement/CompanyDefinition";
import CustomerDefinition from "views/pages/ProductionInfoManagement/CustomerDefinition";
import FactoryDefinition from "views/pages/ProductionInfoManagement/FactoryDefinition";
import InventoryDefinition from "views/pages/ProductionInfoManagement/InventoryDefinition";
import ProducerDefinition from "views/pages/ProductionInfoManagement/ProducerDefinition";
import PurchaseOrderDefinition from "views/pages/ProductionInfoManagement/PurchaseOrderDefinition";
import SalesDefinition from "views/pages/ProductionInfoManagement/SalesDefinition";
import SettingWarehouse from "views/pages/ProductionInfoManagement/SettingWarehouse";
import WarehouseDefinition from "views/pages/ProductionInfoManagement/WarehouseDefinition";
import ImportWarehouse from "views/pages/ImportWarehouse";
import ExportWarehouse from "views/pages/ExportWarehouse";
import ExpiryWarning from "views/pages/WarehouseManage/ExpiryWarning";
import Inventories from "views/pages/WarehouseManage/Inventories";
import InventoryReport from "views/pages/WarehouseManage/InventoryReport";
import StatisticsInventory from "views/pages/WarehouseManage/StatisticsInventory";
import StorageWarning from "views/pages/WarehouseManage/StorageWarning";
import {
  DashboardSVG,
  SettingSVG,
  CategorySVG,
  ProductionSVG,
  ExportSVG,
  ImportSVG,
  TransferSVG,
  InventorySVG,
  CheckSpaceSVG,
} from "assets/svg";

const routes = [
  {
    name: "Tổng quan",
    state: "dashboard",
    big: true,
    svg: DashboardSVG,
    path: "dashboard",
    component: Dashboard,
    layout: "/",
  },
  {
    collapse: true,
    name: "Cài đặt danh mục",
    state: "category-setting",
    svg: SettingSVG,
    views: [
      {
        path: "product-groups",
        name: "Nhóm sản phẩm",
        miniName: "PG",
        component: ProductGroups,
        layout: "/",
      },
      {
        path: "product-types",
        name: "Kiểu sản phẩm",
        miniName: "PT",
        component: ProductTypes,
        layout: "/",
      },
      {
        path: "product-units",
        name: "Đơn vị sản phẩm",
        miniName: "PU",
        component: ProductUnits,
        layout: "/",
      },
    ],
  },
  {
    collapse: true,
    name: "Định nghĩa danh mục",
    state: "category-definition",
    svg: CategorySVG,
    views: [
      {
        path: "detailed-definition",
        name: "Định nghĩa chi tiết",
        miniName: "DD",
        component: DetailedDefinition,
        layout: "/",
      },
      {
        path: "product-definition",
        name: "Định nghĩa sản phẩm",
        miniName: "PD",
        component: ProductDefinition,
        layout: "/",
      },
      {
        path: "package-definition",
        name: "Định nghĩa đóng gói",
        miniName: "PD",
        component: PackageDefinition,
        layout: "/",
      },
      {
        path: "block-definition",
        name: "Định nghĩa kiện",
        miniName: "BD",
        component: BlockDefinition,
        layout: "/",
      },
    ],
  },
  {
    collapse: true,
    state: "production-info-management",
    name: "Quản lý thông tin SX",
    svg: ProductionSVG,
    views: [
      {
        path: "company-definition",
        name: "Định nghĩa công ty",
        miniName: "CD",
        component: CommandProductionInOut,
        layout: "/",
      },
      {
        path: "factory-definition",
        name: "Định nghĩa nhà máy",
        miniName: "FD",
        component: CommandProductionInOutOrder,
        layout: "/",
      },
      {
        path: "producer-definition",
        name: "Định nghĩa nhà cung cấp",
        miniName: "PD",
        component: CompanyDefinition,
        layout: "/",
      },
      {
        path: "customer-definition",
        name: "Định nghĩa khách hàng",
        miniName: "CD",
        component: CustomerDefinition,
        layout: "/",
      },
      {
        path: "purchase-order-definition",
        name: "Định nghĩa đơn đặt hàng",
        miniName: "POD",
        component: PurchaseOrderDefinition,
        layout: "/",
      },
      {
        path: "sales-definition",
        name: "Định nghĩa đơn bán hàng",
        miniName: "SD",
        component: SalesDefinition,
        layout: "/",
      },
      {
        path: "command-production-inout",
        name: "Lệnh xuất nhập",
        miniName: "CPIO",
        component: CommandProductionInOut,
        layout: "/",
      },
      {
        path: "command-production-inout-follow-order",
        name: "Lệnh xuất theo đơn bán hàng",
        miniName: "CDIOFO",
        component: CommandProductionInOutOrder,
        layout: "/",
      },
      {
        path: "inventory-definition",
        name: "Định nghĩa lệnh kiểm kê",
        miniName: "ID",
        component: InventoryDefinition,
        layout: "/",
      },
      {
        path: "setting-warehouse",
        name: "Cài đặt kho",
        miniName: "SD",
        component: SettingWarehouse,
        layout: "/",
      },
      {
        path: "warehouse-definition",
        name: "Định nghĩa kho",
        miniName: "WD",
        component: WarehouseDefinition,
        layout: "/",
      },
    ],
  },
  {
    collapse: false,
    big: true,
    path: "import-warehouse",
    name: "Nhập kho",
    svg: ImportSVG,
    component: ImportWarehouse,
    layout: "/",
  },
  {
    collapse: false,
    big: true,
    path: "export-warehouse",
    name: "Xuất kho",
    svg: ExportSVG,
    component: ExportWarehouse,
    layout: "/",
  },
  {
    collapse: true,
    state: "inventory-manage",
    name: "Quản lý tồn kho",
    svg: InventorySVG,
    views: [
      {
        path: "inventory-report",
        name: "Báo cáo tồn kho",
        miniName: "SD",
        component: InventoryReport,
        layout: "/",
      },
      {
        path: "storage-warning",
        name: "Cảnh báo quá hạn lưu kho",
        miniName: "AD",
        component: StorageWarning,
        layout: "/",
      },
      {
        path: "inventories",
        name: "Thống kê về kiểm kê",
        miniName: "FD",
        component: Inventories,
        layout: "/",
      },
      {
        path: "statistics-inventory",
        name: "Thống kê về tồn kho",
        miniName: "FD",
        component: StatisticsInventory,
        layout: "/",
      },
      {
        path: "expiry-warning",
        name: "Cảnh báo quá hạn sử dụng",
        miniName: "FD",
        component: ExpiryWarning,
        layout: "/",
      },
    ],
  },
  {
    path: "check-warehouse-space",
    big: true,
    state: "check-warehouse-space",
    collapse: false,
    name: "Kiểm tra khoảng trống kho",
    svg: CheckSpaceSVG,
    component: ProducerManage,
    layout: "/",
  },
  {
    collapse: true,
    redirect: true,
    name: "Auth",
    icon: "ni ni-ungroup text-orange",
    state: "examplesAuth",
    role: "",
    views: [
      {
        path: "/login",
        name: "LoginPage",
        miniName: "L",
        component: LoginPage,
        layout: "/auth",
      },
      {
        path: "/forgot-password",
        name: "ForgotPasswordPage",
        miniName: "F",
        component: ForgotPasswordPage,
        layout: "/auth",
      },
      {
        path: "/reset-password",
        name: "ResetPasswordPage",
        miniName: "R",
        component: ResetPasswordPage,
        layout: "/auth",
      },
    ],
  },
];
export default routes;
export const routeAdmin = [
  {
    collapse: true,
    name: "Tài khoản người dùng",
    icon: "ni ni-circle-08",
    state: "accountCollapse",
    views: [
      {
        path: "accounts",
        name: "Quản lý tài khoản",
        miniName: "A",
        component: AccountManage,
        layout: "/",
      },
      {
        path: "roles",
        name: "Quản lý phân quyền",
        miniName: "R",
        component: RoleManage,
        layout: "/",
      },
    ],
  },
  // {
  //   collapse: true,
  //   name: "Khách hàng",
  //   icon: "ni ni-badge",
  //   state: "userCollapse",
  //   views: [
  //     {
  //       path: "customers",
  //       name: "Danh sách",
  //       miniName: "Q",
  //       component: CustomerManage,
  //       layout: "/",
  //     },
  //     // {
  //     //   path: "add-customer",
  //     //   name: "Thêm mới",
  //     //   miniName: "T",
  //     //   component: AddCustomer,
  //     //   layout: "/",
  //     // },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Nhà sản xuất",
  //   icon: "ni ni-building",
  //   state: "producerCollapse",
  //   views: [
  //     {
  //       path: "producers",
  //       name: "Danh sách",
  //       miniName: "PM",
  //       component: ProducerManage,
  //       layout: "/",
  //     },
  //     // {
  //     // 	path: "add-producer",
  //     // 	name: "Thêm mới",
  //     // 	miniName: "AP",
  //     // 	component: AddProducer,
  //     // 	layout: "/",
  //     // },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Kho hàng NPL",
  //   icon: "ni ni-box-2",
  //   state: "warehouseCollapse",
  //   views: [
  //     {
  //       path: "npl-types",
  //       name: "Thể loại",
  //       miniName: "NPLT",
  //       component: NplTypes,
  //       layout: "/",
  //     },
  //     {
  //       path: "npls",
  //       name: "Danh sách",
  //       miniName: "Q",
  //       component: NplManage,
  //       layout: "/",
  //     },
  //     {
  //       path: "add-npl",
  //       name: "Thêm mới",
  //       miniName: "T",
  //       component: AddNPL,
  //       layout: "/",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Tiêu chuẩn số đo",
  //   icon: "ni ni-ruler-pencil",
  //   state: "standardCollapse",
  //   views: [
  //     {
  //       path: "list-standards",
  //       name: "Danh sách",
  //       miniName: "MS",
  //       component: ListMeasurementStandards,
  //       layout: "/",
  //     },
  //     {
  //       path: "add-standards",
  //       name: "Tạo mới",
  //       miniName: "Q",
  //       component: AddMeasurementStandard,
  //       layout: "/",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Danh mục sản phẩm",
  //   icon: "ni ni-cart",
  //   state: "productCollapse",
  //   views: [
  //     {
  //       path: "type-product",
  //       name: "Dòng sản phẩm",
  //       miniName: "TP",
  //       component: TypeProduct,
  //       layout: "/",
  //     },
  //     {
  //       path: "list-product",
  //       name: "Danh sách sản phẩm",
  //       miniName: "TP",
  //       component: ListProduct,
  //       layout: "/",
  //     },
  //     {
  //       path: "add-product",
  //       name: "Tạo mới",
  //       miniName: "AD",
  //       component: AddProduct,
  //       layout: "/",
  //     },
  //   ],
  // },
];
