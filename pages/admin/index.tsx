import { AdminLayout } from "@/components/layouts"
import { NextPage } from "next"

const AdminPage: NextPage = () => {
    return (
        <AdminLayout title="Admin Panel">
            <div>AdminPage</div>
        </AdminLayout>
    )
}

export default AdminPage;