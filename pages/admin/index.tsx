import { AddProducts } from "@/components/admin";
import { AdminLayout } from "@/components/layouts"
import { NextPage } from "next"

const AdminPage: NextPage = () => {
    return (
        <AdminLayout title="Admin Panel">
            <AddProducts />
        </AdminLayout>
    )
}

export default AdminPage;