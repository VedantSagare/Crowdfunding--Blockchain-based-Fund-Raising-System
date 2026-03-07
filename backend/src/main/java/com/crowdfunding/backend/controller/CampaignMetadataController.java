package com.crowdfunding.backend.controller;

import com.crowdfunding.backend.entity.CampaignMetadata;
import com.crowdfunding.backend.repository.CampaignMetadataRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*")
public class CampaignMetadataController {

    private final CampaignMetadataRepository campaignMetadataRepository;

    public CampaignMetadataController(CampaignMetadataRepository campaignMetadataRepository) {
        this.campaignMetadataRepository = campaignMetadataRepository;
    }

    @PostMapping
    public ResponseEntity<?> createMetadata(@Valid @RequestBody CampaignMetadata metadata) {
        if (campaignMetadataRepository.findByOnChainId(metadata.getOnChainId()).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("message", "Metadata already exists for this on-chain id"));
        }
        return ResponseEntity.status(201).body(campaignMetadataRepository.save(metadata));
    }

    @GetMapping
    public List<CampaignMetadata> getAllMetadata() {
        return campaignMetadataRepository.findAll();
    }

    @GetMapping("/{onChainId}")
    public ResponseEntity<CampaignMetadata> getMetadata(@PathVariable Long onChainId) {
        return campaignMetadataRepository.findByOnChainId(onChainId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
