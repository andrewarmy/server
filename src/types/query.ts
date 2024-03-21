type FilterQueryProps = {
    search?: string;
    skip: number;
    take: number
    where?: Record<string, any>
}