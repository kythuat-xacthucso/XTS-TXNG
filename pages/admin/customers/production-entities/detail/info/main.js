(function () {
    // Function to initialize entity info with data from parent
    window.initializeEntityInfo = function(entityData) {
        if (!entityData) {
            console.warn('No entity data provided to initializeEntityInfo');
            return;
        }

        // Populate entity information
        document.getElementById('entityCode').textContent = entityData.code || 'N/A';
        document.getElementById('entityName').textContent = entityData.name || 'N/A';
        document.getElementById('entityPhone').textContent = entityData.phone || 'N/A';
        document.getElementById('entityEmail').textContent = entityData.email || 'N/A';
        document.getElementById('entityFullName').textContent = entityData.fullName || 'N/A';
        document.getElementById('entityEnglishName').textContent = entityData.englishName || 'N/A';
        document.getElementById('entityShortName').textContent = entityData.shortName || 'N/A';
        document.getElementById('entityTaxCode').textContent = entityData.taxCode || 'N/A';
        document.getElementById('entityRegDate').textContent = entityData.regDate || 'N/A';
        document.getElementById('entityGcpCode').textContent = entityData.gcpCode || 'N/A';
        document.getElementById('entityRegPlace').textContent = entityData.regPlace || 'N/A';
        document.getElementById('entityRegAddress').textContent = entityData.regAddress || 'N/A';
        document.getElementById('entityWebsite').href = entityData.website || '#';
        document.getElementById('entityWebsite').textContent = (entityData.website || '').replace(/^https?:\/\//, '') || 'N/A';
        document.getElementById('entityYoutube').href = entityData.youtube || '#';
        document.getElementById('entityYoutube').textContent = (entityData.youtube || '').replace(/^https?:\/\//, '') || 'N/A';
        document.getElementById('entityMap').src = entityData.map || 'https://maps.google.com/maps?q=Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed';
        document.getElementById('entityDescription').textContent = entityData.description || 'N/A';
        document.getElementById('entityType').textContent = entityData.type || 'N/A';
        document.getElementById('entityStatus').textContent = entityData.status || 'N/A';
        document.getElementById('entityCreatedAt').textContent = entityData.createdAt || 'N/A';
        document.getElementById('entityCreatedBy').textContent = entityData.createdBy || 'N/A';

        // Populate owner information
        document.getElementById('ownerName').textContent = entityData.owner?.name || 'N/A';
        document.getElementById('ownerPhone').textContent = entityData.owner?.phone || 'N/A';
        document.getElementById('ownerEmail').textContent = entityData.owner?.email || 'N/A';
        document.getElementById('ownerAddress').textContent = entityData.owner?.address || 'N/A';
        document.getElementById('ownerAvatar').src = entityData.owner?.avatar || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';

        // Populate images
        document.getElementById('entityLogo').src = entityData.logo || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('dkkdImage1').src = entityData.dkkdImages?.[0] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('dkkdImage2').src = entityData.dkkdImages?.[1] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('otherImage1').src = entityData.otherImages?.[0] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('otherImage2').src = entityData.otherImages?.[1] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('otherImage3').src = entityData.otherImages?.[2] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('otherImage4').src = entityData.otherImages?.[3] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';
        document.getElementById('otherImage5').src = entityData.otherImages?.[4] || 'https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png';

        // Add click event listeners for image preview
        const images = document.querySelectorAll('.avatar-img, .logo-img, .dkkd-img, .other-img');
        images.forEach(img => {
            img.addEventListener('click', () => {
                const previewImage = document.getElementById('previewImage');
                previewImage.src = img.src;
                document.getElementById('imagePreviewModalLabel').textContent = img.alt;
            });
        });
    };

    // Fallback initialization if no data is passed
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded triggered for entity-info tab');
        if (!window.entityData) {
            console.warn('No entity data available, using default initialization');
            window.initializeEntityInfo({
                code: "CT001",
                name: "Công ty ABC",
                phone: "0901234567",
                email: "info@abc.com",
                fullName: "Công ty TNHH ABC",
                englishName: "ABC Ltd.",
                shortName: "ABC",
                taxCode: "123456789",
                regDate: "01/01/2020",
                gcpCode: "GCP123456",
                regPlace: "Hà Nội",
                regAddress: "123 Đường ABC, Quận XYZ, Hà Nội",
                website: "https://abc.com",
                youtube: "https://youtube.com/abc",
                map: "https://maps.google.com/maps?q=Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed",
                description: "Đây là mô tả ngắn về chủ thể...",
                type: "Tổ chức",
                status: "Đang hoạt động",
                createdAt: "15/01/2023",
                createdBy: "admin01",
                owner: {
                    name: "Nguyễn Văn A",
                    phone: "0912345678",
                    email: "nguyenva@example.com",
                    address: "99 Đường DEF, TP.HCM",
                    avatar: "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png"
                },
                logo: "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
                dkkdImages: [
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png"
                ],
                otherImages: [
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png",
                    "https://xacthucso.s3.amazonaws.com/u1220-e87dc337-dddb-48bd-94d0-96067661657b.png"
                ]
            });
        }
    });

    // Immediate initialization check
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document ready, initializing entity-info tab immediately');
        if (!window.entityData) {
            console.warn('No entity data available on immediate load, using default');
            window.initializeEntityInfo();
        }
    }
})();